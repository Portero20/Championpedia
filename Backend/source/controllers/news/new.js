// const moment = require("moment");

// module.exports = {
//     news: async (req, res) => {
//         try {
//             const now = moment().format("YYYY/MM/DD")

//             const url = `https://newsapi.org/v2/everything?language=es&q=futbol&to=${now}&sortBy=publishedAt&apiKey=ec7319b16ecc4bd0bf705eb7bcbad8f0`;

//             const response = await fetch(url);
//             const data = await response.json();

//             const news = data.articles.map(article => {
//                 return {
//                     title: article.title,
//                     description: article.description,
//                     url: article.url,
//                     published: article.publishedAt
//                 }
//             }).slice(0, 3);

//             return res.status(200).json(news);
//         } catch (error) {
//             return res.status(500).json(error);
//         }
//     }
// }