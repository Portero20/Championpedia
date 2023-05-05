const database = require('../../sql/dbConnection');
const { JSDOM } = require('jsdom');

module.exports = {
    lastArticles: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            const category = req.params.category
            const size = req.params.size

            let query;

            if (category === "players") {
                query = `SELECT players.id, players.title, players.text, players.date, images.image, categories.category From players
                INNER JOIN imagesplayers ON players.id = imagesplayers.player_id
                INNER JOIN images ON imagesplayers.image_id = images.id
                INNER JOIN categories ON players.category = categories.id
                ORDER BY date DESC
                LIMIT ${size};`
            } else if (category === "teams") {
                query = `SELECT teams.id, teams.title, teams.text, teams.date, images.image, categories.category FROM teams
                INNER JOIN imagesteams ON teams.id = imagesteams.team_id
                INNER JOIN images ON imagesteams.image_id = images.id
                INNER JOIN categories ON teams.category = categories.id
                ORDER BY date DESC
                LIMIT ${size};`
            } else if (category === "trophies") {
                query = `SELECT trophies.id, trophies.title, trophies.text, trophies.date, images.image, categories.category FROM trophies 
                INNER JOIN imagestrophies ON trophies.id = imagestrophies.thophy_id
                INNER JOIN images ON imagestrophies.image_id = images.id
                INNER JOIN categories ON trophies.category = categories.id
                ORDER BY date DESC
                LIMIT ${size};`
            }

            database.query(query, function (err, results) {
                if (err) {
                    return console.log(err)
                } else {
                    const data = [];

                    for (let i = 0; i < results.length; i++) {
                        const dom = new JSDOM(results[i].text);
                        const doc = dom.window.document;
                        const pTag = doc.querySelector('p');
                        let text = '';

                        if (pTag !== null) {
                            text = pTag.textContent;
                        }

                        const buffer = results[i].image;
                        const base64 = Buffer.from(buffer).toString('base64');
                        const base64String = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;

                        const obj = {
                            id: results[i].id,
                            category: results[i].category,
                            title: results[i].title,
                            text: text.slice(0, 100) + "...",
                            image: base64String
                        }

                        data.push(obj);
                    }

                    return res.status(200).json(data);
                }
            })

        } catch (error) {
            return res.status(500).json(error);
        }
    }
}