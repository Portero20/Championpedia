const database = require('../sql/dbConnection');
const { validationResult } = require("express-validator")
const moment = require("moment");
const { resolve } = require("path")
const { unlinkSync } = require("fs")

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
                if (req.files) {
                    req.files.forEach(img => {
                        unlinkSync(resolve(__dirname, "../../uploads/articles/" + img.filename))
                    });
                }
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
                console.log("Using Database");
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
                    console.log(`${category} created successfully`);
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
                        console.log("Tags created successfully");

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
                        } else {
                            console.log(`Tags${category} created successfully`);
                        }

                        database.query(`INSERT INTO images VALUES ('', '${req.files[0].filename}')`, (err, results) => {
                            let imageId

                            if (err) {
                                return console.log(error)
                            } else {
                                console.log("Images created successfully");

                                imageId = parseInt(results.insertId)
                            }

                            database.query(`INSERT INTO images${category} VALUES ('','${id}','${imageId}')`, (error) => {
                                if (error) {
                                    return console.log(error)
                                } else {
                                    console.log(`images${category} created successfully`);

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

                console.log("Using Database");
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

                console.log("Using Database");
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
                                let image = result[0].image

                                let data = {
                                    ...article,
                                    image: image,
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

    images: (req, res) => {
        let imagenUrl = req.query.imagen
        res.sendFile(resolve(__dirname, "../../uploads/articles/" + imagenUrl))
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
                if (req.files) {
                    req.files.forEach(img => {
                        unlinkSync(resolve(__dirname, "../../uploads/articles/" + img.filename))
                    });
                }
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
                console.log("Using Database");
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
                } else {
                    console.log(`${category} - ${req.body.id} edited successfully`);
                }
            })

            if (req.files && req.files.length > 0) {

                let querySelectImg;

                if (category == "players") {
                    querySelectImg = `SELECT image_id FROM imagesplayers WHERE player_id = ${req.body.id} `
                } else if (category == "teams") {
                    querySelectImg = `SELECT image_id FROM imagesteams WHERE team_id = ${req.body.id}`
                } else if (category == "trophies") {
                    querySelectImg = `SELECT image_id FROM imagestrophies WHERE thophy_id = ${req.body.id}`
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

                        database.query(`UPDATE images SET image='${req.files[0].filename}' WHERE id = ${idImage}`, (error, results, fields) => {
                            if (error) {
                                return console.log(error)
                            } else {
                                unlinkSync(resolve(__dirname, `../../uploads/articles/${imgName}`))
                                return console.log("Image updated successfully")
                            }
                        })
                    })
                })
            }

            if (req.body.tags) { // ver luego como llega y modificar el if

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
    }
}