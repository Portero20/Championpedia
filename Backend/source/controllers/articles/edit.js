const database = require('../../sql/dbConnection');
const { validationResult } = require("express-validator")
const handleValidationErrors = require("../../logic/validation")

module.exports = {
    edit: (req, res) => {
        try {
            const validations = validationResult(req);
            const errors = handleValidationErrors(validations);

            if (errors) {
                return res.status(200).json(errors);
            }

            let category;

            if (req.body.category.toLowerCase() == "futbolistas") {
                category = "players"
            } else if (req.body.category.toLowerCase() == "equipos") {
                category = "teams"
            } else if (req.body.category.toLowerCase() == "copas") {
                category = "trophies"
            }

            database.query(`USE ${process.env.MYSQLDATABASE};`, (error) => {
                if (error) throw error;
            })

            let query;

            let title = req.body.title.replace(/"/g, '\\"');
            let text = req.body.text.replace(/"/g, '\\"');
            let fullName = req.body.fullName.replace(/"/g, '\\"');
            let nickName = req.body.nickName ? req.body.nickName.replace(/"/g, '\\"') : "";
            let death = req.body.death
            let retire = req.body.retire
            console.log(retire)
            console.log(retire.toString())

            if (category == "players") {
                query = `UPDATE players SET title="${title}",text="${text}",fullName="${fullName}",nickName="${nickName}",born="${req.body.born}", death=${death !== null ? `"${death}"` : null}, height="${req.body.height}",weight="${req.body.weight}",nationality="${req.body.nationality}",position="${req.body.position}",team="${req.body.team}",numbers="${req.body.numbers}",goals="${req.body.goals}",debut="${req.body.debut}", retire=${retire !== null ? `"${retire}"` : null} WHERE id = ${req.body.id};`
            } else if (category == "teams") {
                query = `UPDATE teams SET title="${title}",text="${text}",fullName="${fullName}",foundation="${req.body.foundation}",president="${req.body.president}",stadium="${req.body.stadium}",coach="${req.body.coach}",nickName="${nickName}" WHERE id = ${req.body.id};`
            } else if (category == "trophies") {
                query = `UPDATE trophies SET title="${title}",text="${text}",fullName="${fullName}",campus="${req.body.campus}",foundation="${req.body.foundation}",organizer="${req.body.organizer}",champion="${req.body.champion}",subchampion="${req.body.subchampion}" WHERE id = ${req.body.id}`
            }

            database.query(query, (err, results) => {
                if (err) {
                    return console.log(err);
                }
            })

            if (req.files && req.files.length > 0) {
                let querySelectImg;

                if (category == "players") {
                    querySelectImg = `SELECT image_id FROM imagesPlayers WHERE player_id = ${req.body.id} `
                } else if (category == "teams") {
                    querySelectImg = `SELECT image_id FROM imagesTeams WHERE team_id = ${req.body.id}`
                } else if (category == "trophies") {
                    querySelectImg = `SELECT image_id FROM imagesTrophies WHERE thophy_id = ${req.body.id};`
                }

                database.query(querySelectImg, (error, results) => {
                    let idImage;
                    if (error) {
                        return console.log(error)
                    } else {
                        idImage = results[0].image_id
                    }

                    database.query(`SELECT image FROM images WHERE id = ${idImage}`, (error, results) => {
                        let imgName;
                        if (error) {
                            return console.log(error)
                        } else {
                            imgName = results[0].image
                        }

                        const imagenBuffer = req.files[0].buffer
                        const base64Image = imagenBuffer.toString("base64");

                        database.query(`UPDATE images SET image='${base64Image}' WHERE id = ${idImage}`, (error, results) => {
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
                    query = `SELECT tag_id FROM tagsPlayers WHERE player_id = ${req.body.id}`
                } else if (category == "teams") {
                    query = `SELECT tag_id FROM tagsTeams WHERE team_id = ${req.body.id}`
                } else if (category == "trophies") {
                    query = `SELECT tag_id FROM tagsTrophies WHERE thophy_id = ${req.body.id}`
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
                                    database.query(`INSERT INTO tagsPlayers (player_id, tag_id) VALUES ${tagsValues}`)
                                } else if (category == "teams") {
                                    database.query(`INSERT INTO tagsTeams (team_id, tag_id) VALUES ${tagsValues}`)
                                } else if (category == "trophies") {
                                    database.query(`INSERT INTO tagsTrophies (thophy_id, tag_id) VALUES ${tagsValues}`)
                                }
                            });

                        }

                        if (tagsToDelete.length > 0) {
                            const placeholders = tagsToDelete.map(d => `${d}`);

                            if (category == "players") {
                                database.query(`DELETE FROM tagsPlayers WHERE tag_id IN (${placeholders})`)
                            } else if (category == "teams") {
                                database.query(`DELETE FROM tagsTeams WHERE tag_id IN (${placeholders})`)
                            } else if (category == "trophies") {
                                database.query(`DELETE FROM tagsTrophies WHERE tag_id IN (${placeholders})`)
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