const database = require('../../sql/dbConnection');
const { JSDOM } = require('jsdom');

module.exports = {
    moreViews: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            let query = `SELECT id, title, text, image, category
            FROM (
              SELECT players.id, players.title, players.text, images.image, categories.category, 'players' AS category_type, views
              FROM players 
              INNER JOIN imagesplayers ON imagesplayers.player_id = players.id
              INNER JOIN images ON images.id = imagesplayers.image_id
              INNER JOIN categories ON players.category = categories.id
              UNION ALL
              SELECT teams.id, teams.title, teams.text, images.image, categories.category, 'teams' AS category_type, views
              FROM teams
              INNER JOIN imagesteams ON imagesteams.team_id = teams.id
              INNER JOIN images ON images.id = imagesteams.image_id
              INNER JOIN categories ON teams.category = categories.id
              UNION ALL
              SELECT trophies.id, trophies.title, trophies.text, images.image, categories.category, 'trophies' AS category_type, views
              FROM trophies 
              INNER JOIN imagestrophies ON imagestrophies.thophy_id = trophies.id
              INNER JOIN images ON images.id = imagestrophies.image_id
              INNER JOIN categories ON trophies.category = categories.id
            ) AS combined
            ORDER BY views DESC
            LIMIT 4;`

            database.query(query, function (err, results) {
                if (err) {
                    return console.log(err)
                } else {
                    const data = [];

                    for (let i = 0; i < results.length; i++) {
                        const dom = new JSDOM(results[i].text);
                        const doc = dom.window.document;

                        let firstPTagContent = doc.querySelectorAll('p')[0].textContent.trim();
                        if (firstPTagContent === '') {
                            firstPTagContent = doc.querySelectorAll('p')[1].textContent.trim();
                        }

                        const buffer = results[i].image
                        const base64 = Buffer.from(buffer).toString('base64');
                        const base64String = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;

                        const obj = {
                            id: results[i].id,
                            category: results[i].category,
                            title: results[i].title,
                            text: firstPTagContent.slice(0, 100) + "...",
                            date: results[i].date,
                            image: base64String
                        }

                        data.push(obj);
                    }

                    return res.status(200).json(data);

                }
            })

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}