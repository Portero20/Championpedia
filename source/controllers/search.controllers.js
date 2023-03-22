const database = require('../sql/dbConnection');

module.exports = {
    results: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            let userQuery = req.query.search

            let query = `SELECT players.title FROM players WHERE players.title LIKE '${userQuery}%'
            UNION
            SELECT teams.title FROM teams WHERE teams.title LIKE '${userQuery}%'
            UNION
            SELECT trophies.title FROM trophies WHERE trophies.title LIKE '${userQuery}%'
            ORDER BY title ASC;`;

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
    },

    searchArticle: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            let userQuery = req.body.result

            let query = `SELECT players.id, categories.category FROM players INNER JOIN categories ON players.category = categories.id WHERE players.title = '${userQuery}' UNION SELECT teams.id, categories.category FROM teams INNER JOIN categories ON teams.category = categories.id WHERE teams.title = '${userQuery}' UNION SELECT trophies.id, categories.category FROM trophies INNER JOIN categories ON trophies.category = categories.id WHERE trophies.title = '${userQuery}';`;

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