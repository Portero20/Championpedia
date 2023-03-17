const database = require('../sql/dbConnection');

module.exports = {
    results: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
                console.log("Using Database");
            })

            let userQuery = req.query.search

            let query = `SELECT players.fullName, GROUP_CONCAT(DISTINCT tags.tag SEPARATOR ', ') as tags
            FROM players 
            INNER JOIN tagsplayers ON players.id = tagsplayers.player_id 
            INNER JOIN tags ON tagsplayers.tag_id = tags.id 
            WHERE players.fullName LIKE '%${userQuery}%' OR players.title LIKE '%${userQuery}%' OR tags.tag LIKE '%${userQuery}%'
            GROUP BY players.fullName
            
            UNION 
            
            SELECT teams.fullName, GROUP_CONCAT(DISTINCT tags.tag SEPARATOR ', ') as tags 
            FROM teams 
            INNER JOIN tagsteams ON teams.id = tagsteams.team_id 
            INNER JOIN tags ON tagsteams.tag_id = tags.id 
            WHERE teams.fullName LIKE '%${userQuery}%' OR teams.title LIKE '%${userQuery}%' OR tags.tag LIKE '%${userQuery}%'
            GROUP BY teams.fullName
            
            UNION 
            
            SELECT trophies.fullName, GROUP_CONCAT(DISTINCT tags.tag SEPARATOR ', ') as tags 
            FROM trophies 
            INNER JOIN tagstrophies ON trophies.id = tagstrophies.thophy_id 
            INNER JOIN tags ON tagstrophies.tag_id = tags.id 
            WHERE trophies.fullName LIKE '%${userQuery}%' OR trophies.title LIKE '%${userQuery}%' OR tags.tag LIKE '%${userQuery}%'
            GROUP BY trophies.fullName
            
            ORDER BY fullName ASC;`;

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
                console.log("Using Database");
            })

            let userQuery = req.body.result

            let query = `SELECT players.id, categories.category FROM players INNER JOIN categories ON players.category = categories.id WHERE players.fullName = '${userQuery}' UNION SELECT teams.id, categories.category FROM teams INNER JOIN categories ON teams.category = categories.id WHERE teams.fullName = '${userQuery}' UNION SELECT trophies.id, categories.category FROM trophies INNER JOIN categories ON trophies.category = categories.id WHERE trophies.fullName = '${userQuery}';`;

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