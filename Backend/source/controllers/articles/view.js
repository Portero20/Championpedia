const database = require('../../sql/dbConnection');

module.exports = {
    view: (req, res) => {
        try {
            database.query(`USE ${process.env.MYSQLDATABASE}`, (error) => {
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

            database.query(query, function (err, results) {
                if (err) {
                    return console.log(err)
                } else {
                    return res.status(200).json("Article updated")
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}