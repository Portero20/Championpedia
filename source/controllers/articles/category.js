const database = require('../../sql/dbConnection');

module.exports = {
    categories: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
            })

            database.query(`SELECT category FROM categories`, function (err, result) {
                if (err) {
                    return console.log(err)
                } else {
                    let categories = result.map(c => { return c.category })

                    return res.status(200).json(categories);
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}