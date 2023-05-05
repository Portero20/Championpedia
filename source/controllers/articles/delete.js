const database = require('../../sql/dbConnection');

module.exports = {
    delete: (req, res) => {
        try {

            const category = req.params.category;
            const id = parseInt(req.params.id)

            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            let query1;
            let query2;
            let query3;

            if (category.toLowerCase() === "futbolistas") {
                query1 = `DELETE tagsplayers, tags
                FROM tagsplayers
                LEFT JOIN tags ON tags.id = tagsplayers.tag_id
                WHERE tagsplayers.player_id = ${id};`

                query2 = `DELETE imagesplayers, images
                FROM imagesplayers 
                LEFT JOIN images ON images.id = imagesplayers.image_id
                WHERE imagesplayers.player_id = ${id};`

                query3 = `DELETE FROM players WHERE id = ${id};`
            } else if (category.toLowerCase() === "copas") {
                query1 = `DELETE tagstrophies, tags
                FROM tagstrophies
                LEFT JOIN tags ON tags.id = tagstrophies.tag_id
                WHERE tagstrophies.thophy_id = ${id};`

                query2 = `DELETE imagestrophies, images
                FROM imagestrophies
                LEFT JOIN images ON images.id = imagestrophies.image_id
                WHERE imagestrophies.thophy_id = ${id};`

                query3 = `DELETE FROM trophies WHERE id = ${id};`
            } else if (category.toLowerCase() === "equipos") {
                query1 = `DELETE tagsteams, tags
                FROM tagsteams
                LEFT JOIN tags ON tags.id = tagsteams.tag_id
                WHERE tagsteams.team_id = ${id};`

                query2 = `DELETE imagesteams, images
                FROM imagesteams
                LEFT JOIN images ON images.id = imagesteams.image_id
                WHERE imagesteams.team_id = ${id};`

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