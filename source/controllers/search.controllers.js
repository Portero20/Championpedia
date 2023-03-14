const database = require('../sql/dbConnection');

module.exports = {
    results: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
                console.log("Using Database");
            })

            let userQuery = req.query.search

            let query = `SELECT title FROM players WHERE title LIKE '%${userQuery}%' UNION SELECT title FROM teams WHERE title LIKE '%${userQuery}%' UNION SELECT title FROM trophies WHERE title LIKE '%${userQuery}%'`;

            database.query(query, (err, results, fields) => {
                if (err) {
                    return console.log(err);
                } else {
                    return res.status(200).json(results);
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}