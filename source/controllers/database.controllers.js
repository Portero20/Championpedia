const database = require('../sql/dbConnection');

module.exports = {
    create: (req, res) => {
        let query = `CREATE DATABASE championpedia`;

        database.query(query, (err) => {
            if (err) throw err;

            console.log("Database Created Successfully !");

            let useQuery = `USE championpedia`;
            database.query(useQuery, (error) => {
                if (error) throw error;

                console.log("Using Database");

                return res.send(
                    `Created and Using championpedia Database`);
            })

        })
    }
}