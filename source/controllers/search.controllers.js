const database = require('../sql/dbConnection');

module.exports = {
    results: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
                console.log("Using Database");
            })

            let userQuery = req.query.search

            let query = `SELECT players.fullName FROM players INNER JOIN tagsplayers ON players.id = tagsplayers.player_id INNER JOIN tags ON tagsplayers.tag_id = tags.id WHERE players.fullName LIKE '%${userQuery}%' OR players.title LIKE '%${userQuery}%' OR tags.tag LIKE '%${userQuery}%' UNION SELECT teams.fullName FROM teams INNER JOIN tagsteams ON teams.id = tagsteams.team_id INNER JOIN tags ON tagsteams.tag_id = tags.id WHERE teams.fullName LIKE '%${userQuery}%' OR teams.title LIKE '%${userQuery}%' OR tags.tag LIKE '%${userQuery}%' UNION SELECT trophies.fullName FROM trophies INNER JOIN tagstrophies ON trophies.id = tagstrophies.thophy_id INNER JOIN tags ON tagstrophies.tag_id = tags.id WHERE trophies.fullName LIKE '%${userQuery}%' OR trophies.title LIKE '%${userQuery}%' OR tags.tag LIKE '%${userQuery}%';`;

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