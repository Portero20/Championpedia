const database = require('../../sql/dbConnection');

module.exports = {
    delete: (req, res) => {
        try {

            const category = req.params.category;
            const id = parseInt(req.params.id)

            database.query(`USE ${process.env.MYSQLDATABASE}`, (error) => {
                if (error) throw error;
            })

            let query1;
            let query2;
            let query3;

            if (category.toLowerCase() === "futbolistas") {
                query1 = `DELETE tagsPlayers, tags
                FROM tagsPlayers
                LEFT JOIN tags ON tags.id = tagsPlayers.tag_id
                WHERE tagsPlayers.player_id = ${id};`

                query2 = `DELETE imagesPlayers, images
                FROM imagesPlayers 
                LEFT JOIN images ON images.id = imagesPlayers.image_id
                WHERE imagesPlayers.player_id = ${id};`

                query3 = `DELETE FROM players WHERE id = ${id};`
            } else if (category.toLowerCase() === "copas") {
                query1 = `DELETE tagsTrophies, tags
                FROM tagsTrophies
                LEFT JOIN tags ON tags.id = tagsTrophies.tag_id
                WHERE tagsTrophies.thophy_id = ${id};`

                query2 = `DELETE imagesTrophies, images
                FROM imagesTrophies
                LEFT JOIN images ON images.id = imagesTrophies.image_id
                WHERE imagesTrophies.thophy_id = ${id};`

                query3 = `DELETE FROM trophies WHERE id = ${id};`
            } else if (category.toLowerCase() === "equipos") {
                query1 = `DELETE tagsTeams, tags
                FROM tagsTeams
                LEFT JOIN tags ON tags.id = tagsTeams.tag_id
                WHERE tagsTeams.team_id = ${id};`

                query2 = `DELETE imagesTeams, images
                FROM imagesTeams
                LEFT JOIN images ON images.id = imagesTeams.image_id
                WHERE imagesTeams.team_id = ${id};`

                query3 = `DELETE FROM teams WHERE id = ${id};`
            }

            database.query(query1, function (err, results) {
                if (err) {
                    return console.log(err)
                } else {
                    database.query(query2, function (err, results) {
                        if (err) {
                            return console.log(err)
                        } else {
                            database.query(query3, function (err, results) {
                                if (err) {
                                    return console.log(err)
                                } else {
                                    return res.status(200).json("Article successfully removed");
                                }
                            })
                        }
                    })
                }
            })

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}