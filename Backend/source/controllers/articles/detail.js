const database = require('../../sql/dbConnection');

module.exports = {
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

            database.query(`USE ${process.env.MYSQLDATABASE}`, (error) => {
                if (error) throw error;
            })

            database.query(`SELECT * FROM ${category} WHERE id = ${req.params.id}`, function (err, result) {
                if (err) {
                    return console.log(err)
                } else {
                    let article = result[0]
                    let query;

                    if (category == "players") {
                        query = `SELECT DISTINCT tags.tag from tags inner join tagsPlayers on tags.id = tagsPlayers.tag_id inner join players on tagsPlayers.player_id = ${req.params.id};`
                    } else if (category == "teams") {
                        query = `select DISTINCT tags.tag from tags inner join tagsTeams on tags.id = tagsTeams.tag_id inner join teams on tagsTeams.team_id = ${req.params.id};`
                    } else if (category == "trophies") {
                        query = `select DISTINCT tags.tag from tags inner join tagsTrophies on tags.id = tagsTrophies.tag_id inner join trophies on tagsTrophies.thophy_id = ${req.params.id};`
                    }

                    database.query(query, function (err, result) {
                        let tags;

                        if (err) {
                            return console.log(err)
                        } else {
                            tags = result.map(t => t.tag)
                        }

                        let queryImage

                        if (category == "players") {
                            queryImage = `SELECT DISTINCT images.image from images inner join imagesPlayers on images.id = imagesPlayers.image_id inner JOIN players on imagesPlayers.player_id = ${req.params.id};`
                        } else if (category == "teams") {
                            queryImage = `SELECT DISTINCT images.image from images inner join imagesTeams on images.id = imagesTeams.image_id inner join teams on imagesTeams.team_id = ${req.params.id};`
                        } else if (category == "trophies") {
                            queryImage = `SELECT DISTINCT images.image from images inner join imagesTrophies on images.id = imagesTrophies.image_id inner join trophies on imagesTrophies.thophy_id = ${req.params.id};`
                        }

                        database.query(queryImage, function (err, result) {
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
    }
}