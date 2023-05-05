const database = require('../../sql/dbConnection');

module.exports = {
    viewsCategory: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            const { page, size } = req.query;

            const limit = parseInt(size);
            const offset = (parseInt(page) - 1) * size;

            const category = req.params.category

            let query, countQuery;

            if (category === "players") {
                query = `SELECT players.id, players.title, images.image, categories.category from players
              INNER JOIN imagesplayers ON imagesplayers.player_id = players.id
              INNER JOIN images ON images.id = imagesplayers.image_id
              INNER JOIN categories ON players.category = categories.id
              ORDER BY views DESC
              LIMIT ${limit}
              OFFSET ${offset};`;
                countQuery = `SELECT COUNT(*) AS count FROM players`;
            } else if (category === "teams") {
                query = `SELECT teams.id, teams.title, images.image, categories.category FROM teams
              INNER JOIN imagesteams ON teams.id = imagesteams.team_id
              INNER JOIN images ON imagesteams.image_id = images.id
              INNER JOIN categories ON teams.category = categories.id
              ORDER BY views DESC
              LIMIT ${limit}
              OFFSET ${offset};`;
                countQuery = `SELECT COUNT(*) AS count FROM teams`;
            } else if (category === "trophies") {
                query = `SELECT trophies.id, trophies.title, images.image, categories.category FROM trophies 
              INNER JOIN imagestrophies ON trophies.id = imagestrophies.thophy_id
              INNER JOIN images ON imagestrophies.image_id = images.id
              INNER JOIN categories ON trophies.category = categories.id
              ORDER BY views DESC
              LIMIT ${limit}
              OFFSET ${offset};`;
                countQuery = `SELECT COUNT(*) AS count FROM trophies`;
            }

            database.query(query, function (err, results) {
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

                    database.query(countQuery, function (err, countResult, field) {
                        if (err) {
                            return console.log(err);
                        } else {
                            const totalCount = countResult[0].count;
                            const totalPages = Math.ceil(totalCount / limit);

                            return res.status(200).json({
                                data: data,
                                pagesTotal: parseInt(totalPages)
                            });
                        }
                    });
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}