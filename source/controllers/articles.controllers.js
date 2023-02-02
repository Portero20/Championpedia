const database = require('../sql/dbConnection');
const moment = require("moment");

module.exports = {
    create: (req, res) => {
        try {
            const now = moment().format("YYYY/MM/DD HH:mm:ss")
            
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;

                console.log("Using Database");
            })

            if (req.body.category.toLowerCase() == "futbolistas") {
                database.query(`INSERT INTO players(id, title, text, author, category, date, views, fullName, nickName, born, death, height, weight, nationality, position, team, numbers, goals, debut, retire) VALUES ('','${req.body.title}','${req.body.text}','${req.body.author}', 1,'${now}','','${req.body.fullName}','${req.body.nickName}','${req.body.born}','${req.body.death}','${req.body.height}','${req.body.weight}','${req.body.nationality}','${req.body.position}','${req.body.team}','${req.body.numbers}','${req.body.goals}','${req.body.debut}','${req.body.retire}');`, (error) => {
                    if (error) throw error;

                    console.log("Player created successfully");
                })
            }

            if (req.body.category.toLowerCase() == "equipos") {
                database.query(`INSERT INTO teams(id, title, text, author, category, date, views, fullName, foundation, president, stadium, coach, nickName) VALUES ('','${req.body.title}','${req.body.text}','${req.body.author}', 2,'${now}','','${req.body.fullName}','${req.body.foundation}','${req.body.president}','${req.body.stadium}','${req.body.coach}','${req.body.nickName}');`, (error) => {
                    if (error) throw error;

                    console.log("Team created successfully");
                })
            }

            if (req.body.category.toLowerCase() == "copas") {
                database.query(`INSERT INTO thophies(id, title, text, author, category, date, views, fullName, campus, foundation, organizer, champion, suchampion) VALUES ('','${req.body.title}','${req.body.text}','${req.body.author}', 3,'${now}','','${req.body.fullName}','${req.body.campus}','${req.body.foundation}','${req.body.organizer}','${req.body.champion}','${req.body.subchampion}');`, (error) => {
                    if (error) throw error;

                    console.log("trophy created successfully");
                })
            }

            return res.status(200).json()
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}