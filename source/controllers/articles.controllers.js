const database = require('../sql/dbConnection');
const moment = require("moment");
const { resolve } = require("path")

module.exports = {
    create: (req, res) => {
        try {
            const now = moment().format("YYYY/MM/DD HH:mm:ss")
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
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

            if (category == "players") {
                query = `INSERT INTO players(id, title, text, author, category, date, views, fullName, nickName, born, death, height, weight, nationality, position, team, numbers, goals, debut, retire, identifier) VALUES ('','${req.body.title}','${req.body.text}','${req.body.author}', 1,'${now}','','${req.body.fullName}','${req.body.nickName}','${req.body.born}','${req.body.death}','${req.body.height}','${req.body.weight}','${req.body.nationality}','${req.body.position}','${req.body.team}','${req.body.numbers}','${req.body.goals}','${req.body.debut}','${req.body.retire}','${req.body.author + "-" + uniqueSuffix}');`
            } else if (category == "teams") {
                query = `INSERT INTO teams(id, title, text, author, category, date, views, fullName, foundation, president, stadium, coach, nickName, identifier) VALUES ('','${req.body.title}','${req.body.text}','${req.body.author}', 2,'${now}','','${req.body.fullName}','${req.body.foundation}','${req.body.president}','${req.body.stadium}','${req.body.coach}','${req.body.nickName}','${req.body.author + "-" + uniqueSuffix}');`
            } else if (category == "trophies") {
                query = `INSERT INTO trophies(id, title, text, author, category, date, views, fullName, campus, foundation, organizer, champion, subchampion, identifier) VALUES ('','${req.body.title}','${req.body.text}','${req.body.author}', 3,'${now}','','${req.body.fullName}','${req.body.campus}','${req.body.foundation}','${req.body.organizer}','${req.body.champion}','${req.body.subchampion}','${req.body.author + "-" + uniqueSuffix}');`
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
                    return `('', "${tag}", "${uniqueSuffix}")`
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

                        database.query(`INSERT INTO images VALUES ('', '${req.files[0].filename}','${uniqueSuffix}')`, (err, results)=> {
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

                                return res.status(200).json();

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

    detailPlayer: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;

                console.log("Using Database");
            })

            database.query(`SELECT * FROM players WHERE id = ${req.params.id}`, function (err, result, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    let article = result

                    database.query(`SELECT DISTINCT tags.tag from tags inner join tagsplayers on tags.id = tagsplayers.tag_id inner join players on tagsplayers.player_id = ${req.params.id};`, function (err, result, filed) {
                        if (err) {
                            return console.log(err)
                        } else {
                            let tags = result.map(t => t.tag)

                            database.query(`SELECT DISTINCT images.image from images inner join imagesplayers on images.id = imagesplayers.image_id inner JOIN players on imagesplayers.player_id = ${req.params.id};`, function (err, result, filed) {
                                if (err) {
                                    return console.log(err)
                                } else {
                                    let image = result[0].image

                                    let data = {
                                        article: article,
                                        tags: tags,
                                        image: image
                                    }
                                    return res.status(200).json(data);
                                }
                            })
                        }
                    })
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    detailTeam: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;

                console.log("Using Database");
            })

            database.query(`SELECT * FROM teams WHERE id = ${req.params.id}`, function (err, result, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    let article = result

                    database.query(`select DISTINCT tags.tag from tags inner join tagsteams on tags.id = tagsteams.tag_id inner join teams on tagsteams.team_id = ${req.params.id};`, function (err, result, filed) {
                        if (err) {
                            return console.log(err)
                        } else {
                            let tags = result.map(t => t.tag)

                            database.query(`SELECT DISTINCT images.image from images inner join imagesteams on images.id = imagesteams.image_id inner join teams on imagesteams.team_id = ${req.params.id};`, function (err, result, filed) {
                                if (err) {
                                    return console.log(err)
                                } else {
                                    let image = result[0].image

                                    let data = {
                                        article: article,
                                        tags: tags,
                                        image: image
                                    }
                                    return res.status(200).json(data);
                                }
                            })
                        }
                    })
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    detailTrophy: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;

                console.log("Using Database");
            })

            database.query(`SELECT * FROM trophies WHERE id = ${req.params.id}`, function (err, result, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    let article = result

                    database.query(`select DISTINCT tags.tag from tags inner join tagstrophies on tags.id = tagstrophies.tag_id inner join trophies on tagstrophies.thophy_id = ${req.params.id};`, function (err, result, filed) {
                        if (err) {
                            return console.log(err)
                        } else {
                            let tags = result.map(t => t.tag)

                            database.query(`SELECT DISTINCT images.image from images inner join imagestrophies on images.id = imagestrophies.image_id inner join trophies on imagestrophies.thophy_id = ${req.params.id};`, function (err, result, filed) {
                                if (err) {
                                    return console.log(err)
                                } else {
                                    let image = result[0].image

                                    let data = {
                                        article: article,
                                        tags: tags,
                                        image: image
                                    }
                                    return res.status(200).json(data);
                                }
                            })
                        }
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
    }
}