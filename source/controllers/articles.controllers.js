const database = require('../sql/dbConnection');
const { validationResult } = require("express-validator")
const moment = require("moment");
const { JSDOM } = require('jsdom');

module.exports = {
    create: (req, res) => {
        try {
            let validations = validationResult(req)
            let { errors } = validations
            let errorMsg = errors.map(err => Object({
                param: err.param,
                value: err.value,
                msg: err.msg
            }))

            if (errors && errors.length > 0) {
                return res.status(200).json(errorMsg)
            }

            const now = moment().format("YYYY/MM/DD HH:mm:ss")
            let category;

            if (req.body.category.toLowerCase() == "futbolistas") {
                category = "players"
            } else if (req.body.category.toLowerCase() == "equipos") {
                category = "teams"
            } else if (req.body.category.toLowerCase() == "copas") {
                category = "trophies"
            }

            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            let query;

            let title = req.body.title.replace(/"/g, '\\"');
            let text = req.body.text.replace(/"/g, '\\"');
            let author = req.body.author.replace(/"/g, '\\"');
            let fullName = req.body.fullName.replace(/"/g, '\\"');
            let nickName = req.body.nickName ? req.body.nickName.replace(/"/g, '\\"') : null

            if (category == "players") {
                query = `INSERT INTO players(id, title, text, author, category, date, views, fullName, nickName, born, death, height, weight, nationality, position, team, numbers, goals, debut, retire) VALUES ("","${title}","${text}","${author}", 1,"${now}","","${fullName}","${nickName}","${req.body.born}","${req.body.death}","${req.body.height}","${req.body.weight}","${req.body.nationality}","${req.body.position}","${req.body.team}","${req.body.numbers}","${req.body.goals}","${req.body.debut}","${req.body.retire}");`
            } else if (category == "teams") {
                query = `INSERT INTO teams(id, title, text, author, category, date, views, fullName, foundation, president, stadium, coach, nickName) VALUES ("","${title}","${text}","${author}", 2,"${now}","","${fullName}","${req.body.foundation}","${req.body.president}","${req.body.stadium}","${req.body.coach}","${nickName}");`
            } else if (category == "trophies") {
                query = `INSERT INTO trophies(id, title, text, author, category, date, views, fullName, campus, foundation, organizer, champion, subchampion) VALUES ("","${title}","${text}","${author}", 3,"${now}","","${fullName}","${req.body.campus}","${req.body.foundation}","${req.body.organizer}","${req.body.champion}","${req.body.subchampion}");`
            }

            database.query(query, (err, results, fields) => {
                let id;

                if (err) {
                    return console.log(err);
                } else {
                    id = results.insertId
                }

                let tags = req.body.tags.split(",").map(tag => {
                    return `('', "${tag.trim()}")`
                })

                database.query(`INSERT INTO tags VALUES ${tags}`, (err, results) => {
                    let tagsIds = [];

                    if (err) {
                        return console.log(err)
                    } else {
                        let tagIdFirst = results.insertId
                        let affectedRows = results.affectedRows

                        for (let index = tagIdFirst - 1; index < (tagIdFirst + affectedRows - 1); index++) {
                            tagsIds.push(index + 1)
                        }
                    }

                    let tagsValues = tagsIds.map(t => {
                        return `('', ${id}, ${t})`
                    })

                    database.query(`INSERT INTO tags${category} VALUES ${tagsValues}`, (error) => {
                        if (error) {
                            return console.log(error)
                        }

                        const imagenBuffer = req.files[0].buffer
                        const base64Image = imagenBuffer.toString("base64");

                        database.query(`INSERT INTO images VALUES ('', '${base64Image}')`, (err, results) => {
                            let imageId

                            if (err) {
                                return console.log(error)
                            } else {
                                imageId = parseInt(results.insertId)
                            }

                            database.query(`INSERT INTO images${category} VALUES ('','${id}','${imageId}')`, (error) => {
                                if (error) {
                                    return console.log(error)
                                }

                                return res.status(200).json(id);
                            })
                        })
                    });
                })
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    categories: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            database.query(`SELECT category FROM categories`, function (err, result, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    let categories = result.map(c => { return c.category })

                    return res.status(200).json(categories);
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    detail: (req, res) => {
        try {
            let category;

            if (req.params.category.toLowerCase() == "futbolistas") {
                category = "players"
            } else if (req.params.category.toLowerCase() == "equipos") {
                category = "teams"
            } else if (req.params.category.toLowerCase() == "copas") {
                category = "trophies"
            }

            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            database.query(`SELECT * FROM ${category} WHERE id = ${req.params.id}`, function (err, result, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    let article = result[0]
                    let query;

                    if (category == "players") {
                        query = `SELECT DISTINCT tags.tag from tags inner join tagsplayers on tags.id = tagsplayers.tag_id inner join players on tagsplayers.player_id = ${req.params.id};`
                    } else if (category == "teams") {
                        query = `select DISTINCT tags.tag from tags inner join tagsteams on tags.id = tagsteams.tag_id inner join teams on tagsteams.team_id = ${req.params.id};`
                    } else if (category == "trophies") {
                        query = `select DISTINCT tags.tag from tags inner join tagstrophies on tags.id = tagstrophies.tag_id inner join trophies on tagstrophies.thophy_id = ${req.params.id};`
                    }

                    database.query(query, function (err, result, filed) {
                        let tags;

                        if (err) {
                            return console.log(err)
                        } else {
                            tags = result.map(t => t.tag)
                        }

                        let queryImage

                        if (category == "players") {
                            queryImage = `SELECT DISTINCT images.image from images inner join imagesplayers on images.id = imagesplayers.image_id inner JOIN players on imagesplayers.player_id = ${req.params.id};`
                        } else if (category == "teams") {
                            queryImage = `SELECT DISTINCT images.image from images inner join imagesteams on images.id = imagesteams.image_id inner join teams on imagesteams.team_id = ${req.params.id};`
                        } else if (category == "trophies") {
                            queryImage = `SELECT DISTINCT images.image from images inner join imagestrophies on images.id = imagestrophies.image_id inner join trophies on imagestrophies.thophy_id = ${req.params.id};`
                        }

                        database.query(queryImage, function (err, result, filed) {
                            if (err) {
                                return console.log(err)
                            } else {
                                const buffer = result[0].image
                                const base64 = Buffer.from(buffer).toString('base64');
                                const base64String = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;

                                let data = {
                                    ...article,
                                    image: base64String,
                                    tags: tags
                                }

                                return res.status(200).json(data);
                            }
                        })
                    })
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    edit: (req, res) => {
        try {
            let validations = validationResult(req)
            let { errors } = validations
            let errorMsg = errors.map(err => Object({
                param: err.param,
                value: err.value,
                msg: err.msg
            }))

            if (errors && errors.length > 0) {
                return res.status(200).json(errorMsg)
            }

            const now = moment().format("YYYY/MM/DD HH:mm:ss")
            let category;

            if (req.body.category.toLowerCase() == "futbolistas") {
                category = "players"
            } else if (req.body.category.toLowerCase() == "equipos") {
                category = "teams"
            } else if (req.body.category.toLowerCase() == "copas") {
                category = "trophies"
            }

            database.query(`USE championpedia;`, (error) => {
                if (error) throw error;
            })

            let query;

            let title = req.body.title.replace(/"/g, '\\"');
            let text = req.body.text.replace(/"/g, '\\"');
            let fullName = req.body.fullName.replace(/"/g, '\\"');
            let nickName = req.body.nickName ? req.body.nickName.replace(/"/g, '\\"') : "";

            if (category == "players") {
                query = `UPDATE players SET title="${title}",text="${text}",fullName="${fullName}",nickName="${nickName}",born="${req.body.born}",death="${req.body.death}",height="${req.body.height}",weight="${req.body.weight}",nationality="${req.body.nationality}",position="${req.body.position}",team="${req.body.team}",numbers="${req.body.numbers}",goals="${req.body.goals}",debut="${req.body.debut}",retire="${req.body.retire}" WHERE id = ${req.body.id};`
            } else if (category == "teams") {
                query = `UPDATE teams SET title="${title}",text="${text}",fullName="${fullName}",foundation="${req.body.foundation}",president="${req.body.president}",stadium="${req.body.stadium}",coach="${req.body.coach}",nickName="${nickName}" WHERE id = ${req.body.id};`
            } else if (category == "trophies") {
                query = `UPDATE trophies SET title="${title}",text="${text}",fullName="${fullName}",campus="${req.body.campus}",foundation="${req.body.foundation}",organizer="${req.body.organizer}",champion="${req.body.champion}",subchampion="${req.body.subchampion}" WHERE id = ${req.body.id}`
            }

            database.query(query, (err, results, fields) => {
                if (err) {
                    return console.log(err);
                }
            })

            if (req.files && req.files.length > 0) {
                let querySelectImg;

                if (category == "players") {
                    querySelectImg = `SELECT image_id FROM imagesplayers WHERE player_id = ${req.body.id} `
                } else if (category == "teams") {
                    querySelectImg = `SELECT image_id FROM imagesteams WHERE team_id = ${req.body.id}`
                } else if (category == "trophies") {
                    querySelectImg = `SELECT image_id FROM imagestrophies WHERE thophy_id = ${req.body.id};`
                }

                database.query(querySelectImg, (error, results, fields) => {
                    let idImage;
                    if (error) {
                        return console.log(error)
                    } else {
                        idImage = results[0].image_id
                    }

                    database.query(`SELECT image FROM images WHERE id = ${idImage}`, (error, results, fields) => {
                        let imgName;
                        if (error) {
                            return console.log(error)
                        } else {
                            imgName = results[0].image
                        }

                        const imagenBuffer = req.files[0].buffer
                        const base64Image = imagenBuffer.toString("base64");

                        database.query(`UPDATE images SET image='${base64Image}' WHERE id = ${idImage}`, (error, results, fields) => {
                            if (error) {
                                return console.log(error)
                            }
                        })
                    })
                })
            }

            if (req.body.tags) {

                let tags = req.body.tags.split(",").map(tag => {
                    return tag.trim()
                })

                let query;

                if (category == "players") {
                    query = `SELECT tag_id FROM tagsplayers WHERE player_id = ${req.body.id}`
                } else if (category == "teams") {
                    query = `SELECT tag_id FROM tagsteams WHERE team_id = ${req.body.id}`
                } else if (category == "trophies") {
                    query = `SELECT tag_id FROM tagstrophies WHERE thophy_id = ${req.body.id}`
                }

                database.query(query, (error, results, fields) => {
                    let tagdIdDB;

                    if (error) {
                        return console.log(error)
                    } else {
                        tagdIdDB = results.map(tag => tag.tag_id)
                    }

                    tagdIdDB.map(tagdId => { return `${tagdId}` })

                    database.query(`SELECT id, tag FROM tags WHERE id IN (${tagdIdDB})`, (error, results, fields) => {
                        let rows;

                        if (error) {
                            return console.log(error)
                        } else {
                            rows = results
                        }

                        const existingTags = rows.map(row => ({ id: row.id, tag: row.tag }));
                        const newTags = [];
                        const tagsToDelete = [];

                        for (const tag of tags) {
                            if (existingTags.some(t => t.tag === tag)) {
                            } else {
                                newTags.push(tag);
                            }
                        }

                        for (const row of rows) {
                            if (!tags.some(t => t === row.tag)) {
                                tagsToDelete.push(row.id);
                            }
                        }

                        if (newTags.length > 0) {
                            const values = newTags.map(tag => `('${tag}')`);
                            database.query(`INSERT INTO tags (tag) VALUES ${values}`, (error, results, fields) => {
                                let tagsIdNews = [];
                                if (error) {
                                    return console.log(error)
                                } else {
                                    let tagIdFirst = results.insertId
                                    let affectedRows = results.affectedRows

                                    for (let index = tagIdFirst - 1; index < (tagIdFirst + affectedRows - 1); index++) {
                                        tagsIdNews.push(index + 1)
                                    }
                                }

                                let tagsValues = tagsIdNews.map(t => {
                                    return `( ${req.body.id}, ${t})`
                                })

                                if (category == "players") {
                                    database.query(`INSERT INTO tagsplayers (player_id, tag_id) VALUES ${tagsValues}`)
                                } else if (category == "teams") {
                                    database.query(`INSERT INTO tagsteams (team_id, tag_id) VALUES ${tagsValues}`)
                                } else if (category == "trophies") {
                                    database.query(`INSERT INTO tagstrophies (thophy_id, tag_id) VALUES ${tagsValues}`)
                                }
                            });

                        }

                        if (tagsToDelete.length > 0) {
                            const placeholders = tagsToDelete.map(d => `${d}`);

                            if (category == "players") {
                                database.query(`DELETE FROM tagsplayers WHERE tag_id IN (${placeholders})`)
                            } else if (category == "teams") {
                                database.query(`DELETE FROM tagsteams WHERE tag_id IN (${placeholders})`)
                            } else if (category == "trophies") {
                                database.query(`DELETE FROM tagstrophies WHERE tag_id IN (${placeholders})`)
                            }

                            database.query(`DELETE FROM tags WHERE id IN (${placeholders})`);
                        }
                    })
                })
            }

            return res.status(200).json("Article updated successfully");
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    last: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            const query = `SELECT players.id, players.title, players.text, players.date, images.image, categories.category From players
            INNER JOIN imagesplayers ON players.id = imagesplayers.player_id
            INNER JOIN images ON imagesplayers.image_id = images.id
            INNER JOIN categories ON players.category = categories.id
            UNION
            SELECT teams.id, teams.title, teams.text, teams.date, images.image, categories.category FROM teams
            INNER JOIN imagesteams ON teams.id = imagesteams.team_id
            INNER JOIN images ON imagesteams.image_id = images.id
            INNER JOIN categories ON teams.category = categories.id
            UNION
            SELECT trophies.id, trophies.title, trophies.text, trophies.date, images.image, categories.category FROM trophies 
            INNER JOIN imagestrophies ON trophies.id = imagestrophies.thophy_id
            INNER JOIN images ON imagestrophies.image_id = images.id
            INNER JOIN categories ON trophies.category = categories.id
            ORDER BY date DESC
            LIMIT 1;`

            database.query(query, function (err, results, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    const dom = new JSDOM(results[0].text);
                    const doc = dom.window.document;

                    const firstPTagContent = doc.querySelector('p').textContent.trim();
                    let secondPTagContent = '';

                    if (firstPTagContent === '') {
                        const secondPTag = doc.querySelector('p:nth-of-type(2)');
                        if (secondPTag) {
                            secondPTagContent = secondPTag.textContent.trim();
                        }
                    } else {
                        secondPTagContent = firstPTagContent;
                    }

                    const buffer = results[0].image
                    const base64 = Buffer.from(buffer).toString('base64');
                    const base64String = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;

                    const data = {
                        id: results[0].id,
                        title: results[0].title,
                        text: secondPTagContent.slice(0, 300) + "...",
                        date: results[0].date,
                        image: base64String,
                        category: results[0].category
                    };

                    return res.status(200).json(data);
                }
            })

        } catch (error) {
            return res.status(500).json(error)
        }
    },
    view: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            let category;

            if (req.body.category.toLowerCase() == "futbolistas") {
                category = "players"
            } else if (req.body.category.toLowerCase() == "equipos") {
                category = "teams"
            } else if (req.body.category.toLowerCase() == "copas") {
                category = "trophies"
            }

            let query = `UPDATE ${category} SET views = views + 1 WHERE id = ${req.body.id};`

            database.query(query, function (err, results, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    return res.status(200).json("Article updated")
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    moreViews: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            let query = `SELECT id, title, text, image, category
            FROM (
              SELECT players.id, players.title, players.text, images.image, categories.category, 'players' AS category_type, views
              FROM players 
              INNER JOIN imagesplayers ON imagesplayers.player_id = players.id
              INNER JOIN images ON images.id = imagesplayers.image_id
              INNER JOIN categories ON players.category = categories.id
              UNION ALL
              SELECT teams.id, teams.title, teams.text, images.image, categories.category, 'teams' AS category_type, views
              FROM teams
              INNER JOIN imagesteams ON imagesteams.team_id = teams.id
              INNER JOIN images ON images.id = imagesteams.image_id
              INNER JOIN categories ON teams.category = categories.id
              UNION ALL
              SELECT trophies.id, trophies.title, trophies.text, images.image, categories.category, 'trophies' AS category_type, views
              FROM trophies 
              INNER JOIN imagestrophies ON imagestrophies.thophy_id = trophies.id
              INNER JOIN images ON images.id = imagestrophies.image_id
              INNER JOIN categories ON trophies.category = categories.id
            ) AS combined
            ORDER BY views DESC
            LIMIT 4;`

            database.query(query, function (err, results, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    const data = [];

                    for (let i = 0; i < results.length; i++) {
                        const dom = new JSDOM(results[i].text);
                        const doc = dom.window.document;

                        let firstPTagContent = doc.querySelectorAll('p')[0].textContent.trim();
                        if (firstPTagContent === '') {
                            firstPTagContent = doc.querySelectorAll('p')[1].textContent.trim();
                        }

                        const buffer = results[i].image
                        const base64 = Buffer.from(buffer).toString('base64');
                        const base64String = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;

                        const obj = {
                            id: results[i].id,
                            category: results[i].category,
                            title: results[i].title,
                            text: firstPTagContent.slice(0, 100) + "...",
                            date: results[i].date,
                            image: base64String
                        }

                        data.push(obj);
                    }

                    return res.status(200).json(data);

                }
            })

        } catch (error) {
            return res.status(500).json(error)
        }
    },
    news: async (req, res) => {
        try {
            const now = moment().format("YYYY/MM/DD")

            const url = `https://newsapi.org/v2/everything?language=es&q=futbol&to=${now}&sortBy=publishedAt&apiKey=ec7319b16ecc4bd0bf705eb7bcbad8f0`;

            const response = await fetch(url);
            const data = await response.json();

            const news = data.articles.map(article => {
                return {
                    title: article.title,
                    description: article.description,
                    url: article.url,
                    published: article.publishedAt
                }
            }).slice(0, 3);

            return res.status(200).json(news);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    lastArticles: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            const category = req.params.category
            const size = req.params.size

            let query;

            if (category === "players") {
                query = `SELECT players.id, players.title, players.text, players.date, images.image, categories.category From players
                INNER JOIN imagesplayers ON players.id = imagesplayers.player_id
                INNER JOIN images ON imagesplayers.image_id = images.id
                INNER JOIN categories ON players.category = categories.id
                ORDER BY date DESC
                LIMIT ${size};`
            } else if (category === "teams") {
                query = `SELECT teams.id, teams.title, teams.text, teams.date, images.image, categories.category FROM teams
                INNER JOIN imagesteams ON teams.id = imagesteams.team_id
                INNER JOIN images ON imagesteams.image_id = images.id
                INNER JOIN categories ON teams.category = categories.id
                ORDER BY date DESC
                LIMIT ${size};`
            } else if (category === "trophies") {
                query = `SELECT trophies.id, trophies.title, trophies.text, trophies.date, images.image, categories.category FROM trophies 
                INNER JOIN imagestrophies ON trophies.id = imagestrophies.thophy_id
                INNER JOIN images ON imagestrophies.image_id = images.id
                INNER JOIN categories ON trophies.category = categories.id
                ORDER BY date DESC
                LIMIT ${size};`
            }

            database.query(query, function (err, results, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    const data = [];

                    for (let i = 0; i < results.length; i++) {
                        const dom = new JSDOM(results[i].text);
                        const doc = dom.window.document;
                        const pTag = doc.querySelector('p');
                        let text = '';

                        if (pTag !== null) {
                            text = pTag.textContent;
                        }

                        const buffer = results[i].image;
                        const base64 = Buffer.from(buffer).toString('base64');
                        const base64String = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;

                        const obj = {
                            id: results[i].id,
                            category: results[i].category,
                            title: results[i].title,
                            text: text.slice(0, 100) + "...",
                            image: base64String
                        }

                        data.push(obj);
                    }

                    return res.status(200).json(data);
                }
            })

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    viewsCategory: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })
            const { page, size } = req.query;

            const limit = parseInt(size);
            const offset = (parseInt(page) - 1) * size;

            const category = req.params.category

            let query;

            if (category === "players") {
                query = `SELECT players.id, players.title, images.image, categories.category from players
                INNER JOIN imagesplayers ON imagesplayers.player_id = players.id
                INNER JOIN images ON images.id = imagesplayers.image_id
                INNER JOIN categories ON players.category = categories.id
                ORDER BY views DESC
                LIMIT ${limit}
                OFFSET ${offset};`
            } else if (category === "teams") {
                query = `SELECT teams.id, teams.title, images.image, categories.category FROM teams
                INNER JOIN imagesteams ON teams.id = imagesteams.team_id
                INNER JOIN images ON imagesteams.image_id = images.id
                INNER JOIN categories ON teams.category = categories.id
                ORDER BY views DESC
                LIMIT ${limit}
                OFFSET ${offset};`
            } else if (category === "trophies") {
                query = `SELECT trophies.id, trophies.title, images.image, categories.category FROM trophies 
                INNER JOIN imagestrophies ON trophies.id = imagestrophies.thophy_id
                INNER JOIN images ON imagestrophies.image_id = images.id
                INNER JOIN categories ON trophies.category = categories.id
                ORDER BY views DESC
                LIMIT ${limit}
                OFFSET ${offset};`
            }

            database.query(query, function (err, results, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    let data = [];

                    results.forEach(res => {
                        const buffer = res.image;
                        const base64 = Buffer.from(buffer).toString('base64');
                        const base64String = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;

                        data.push({
                            id: res.id,
                            title: res.title,
                            image: base64String,
                            category: res.category
                        })
                    });

                    return res.status(200).json(data);

                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}