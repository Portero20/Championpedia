const database = require('../../sql/dbConnection');
const { validationResult } = require("express-validator")
const moment = require("moment");
const handleValidationErrors = require("../../logic/validation")

module.exports = {
    create: (req, res) => {
        try {
            const validations = validationResult(req);
            const errors = handleValidationErrors(validations);

            if (errors) {
                return res.status(200).json(errors);
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

            database.query(query, (err, results) => {
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
    }
}