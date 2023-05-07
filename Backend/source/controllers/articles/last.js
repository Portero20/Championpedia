const database = require("../../sql/dbConnection")
const { JSDOM } = require('jsdom');

module.exports = {
    last: (req, res) => {
        try {
            database.query(`USE ${process.env.MYSQLDATABASE}`, (error) => {
                if (error) throw error;
            })

            const query = `SELECT players.id, players.title, players.text, players.date, images.image, categories.category From players
            INNER JOIN imagesPlayers ON players.id = imagesPlayers.player_id
            INNER JOIN images ON imagesPlayers.image_id = images.id
            INNER JOIN categories ON players.category = categories.id
            UNION
            SELECT teams.id, teams.title, teams.text, teams.date, images.image, categories.category FROM teams
            INNER JOIN imagesTeams ON teams.id = imagesTeams.team_id
            INNER JOIN images ON imagesTeams.image_id = images.id
            INNER JOIN categories ON teams.category = categories.id
            UNION
            SELECT trophies.id, trophies.title, trophies.text, trophies.date, images.image, categories.category FROM trophies 
            INNER JOIN imagesTrophies ON trophies.id = imagesTrophies.thophy_id
            INNER JOIN images ON imagesTrophies.image_id = images.id
            INNER JOIN categories ON trophies.category = categories.id
            ORDER BY date DESC
            LIMIT 1;`

            database.query(query, function (err, results) {
                if (err) {
                    return console.log(err)
                } else {
                    if(!results.length || !results[0]) return res.status(200).json("");
                    const dom = new JSDOM(results[0].text);
                    const doc = dom.window.document;

                    const firstPTagContent = doc.querySelector('p').textContent.trim();
                    let secondPTagContent = '';

                    if (firstPTagContent === '') {
                        const secondPTag = doc.querySelector('p:nth-of-type(2)');
                        if (secondPTag) {
                            secondPTagContent = secondPTag.textContent.trim();
                        }
                    } else {
                        secondPTagContent = firstPTagContent;
                    }

                    const buffer = results[0].image
                    const base64 = Buffer.from(buffer).toString('base64');
                    const base64String = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;

                    const data = {
                        id: results[0].id,
                        title: results[0].title,
                        text: secondPTagContent.slice(0, 300) + "...",
                        date: results[0].date,
                        image: base64String,
                        category: results[0].category
                    };

                    return res.status(200).json(data);
                }
            })

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}