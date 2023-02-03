const database = require('../sql/dbConnection');
const moment = require("moment");

module.exports = {
    create: (req, res) => {
        try {
            const now = moment().format("YYYY/MM/DD HH:mm:ss")
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

            database.query(`USE championpedia`, (error) => {
                if (error) throw error;

                console.log("Using Database");
            })

            if (req.body.category.toLowerCase() == "futbolistas") {

                // Inserto los datos en la tabla players
                database.query(`INSERT INTO players(id, title, text, author, category, date, views, fullName, nickName, born, death, height, weight, nationality, position, team, numbers, goals, debut, retire, identifier) VALUES ('','${req.body.title}','${req.body.text}','${req.body.author}', 1,'${now}','','${req.body.fullName}','${req.body.nickName}','${req.body.born}','${req.body.death}','${req.body.height}','${req.body.weight}','${req.body.nationality}','${req.body.position}','${req.body.team}','${req.body.numbers}','${req.body.goals}','${req.body.debut}','${req.body.retire}','${req.body.author + "-" + uniqueSuffix}');`,
                    (error) => {
                        if (error) {
                            return console.log(error);
                        } else {
                            console.log("Player created successfully");

                            // Selecciono el id de la fila creada
                            database.query(`SELECT id FROM players WHERE identifier = "${req.body.author + "-" + uniqueSuffix}";`, function (err, result, filed) {
                                let idPlayer;
                                if (err) {
                                    console.error(err);
                                } else {
                                    idPlayer = result[0].id

                                    let tags = req.body.tags.split(",").map(tag => {
                                        return `('', "${tag}", "${uniqueSuffix}")`
                                    })

                                    // Inserto los tags en la tabla tags
                                    database.query(`INSERT INTO tags(id, tag, identifier) VALUES ${tags}`, (error) => {
                                        if (error) {
                                            return console.log(error)
                                        } else {
                                            console.log("Tags created successfully");

                                            // Selecciono los ids de los tags creados
                                            database.query(`SELECT id FROM tags WHERE identifier = "${uniqueSuffix}"`, function (err, result, filed) {
                                                let idsTags;
                                                if (err) {
                                                    console.error(err);
                                                } else {
                                                    idsTags = result.map(t => t.id);

                                                    let idArticleTags = idsTags.map(t => {
                                                        return `('', ${idPlayer}, ${t})`
                                                    })

                                                    // Inserto el id de la fila players y los ids de las filas tags
                                                    database.query(`INSERT INTO tagsplayers(id, player_id, tag_id) VALUES ${idArticleTags}`, (error) => {
                                                        if (error) {
                                                            return console.log(error)
                                                        } else {
                                                            console.log("TagsPlayers created successfully");

                                                            //Inserto la imagen en la tabla images
                                                            database.query(`INSERT INTO images(id, image, identifier) VALUES ('','${req.files[0].filename}','${uniqueSuffix}')`, (error) => {
                                                                if (error) {
                                                                    return console.log(error)
                                                                } else {
                                                                    console.log("Images created successfully");

                                                                    // Selecciono los ids de las images
                                                                    database.query(`SELECT id FROM images WHERE identifier = "${uniqueSuffix}"`, function (err, result, filed) {
                                                                        let idImage;
                                                                        if (err) {
                                                                            console.error(err);
                                                                        } else {
                                                                            idImage = result[0].id

                                                                            //Inserto el id de la fila players y el id de la imagen
                                                                            database.query(`INSERT INTO imagesplayers(id, player_id, image_id) VALUES ('','${idPlayer}','${idImage}')`, (error) => {
                                                                                if (error) {
                                                                                    return console.log(error)
                                                                                } else {
                                                                                    console.log("ImagesPlayers created successfully");
                                                                                }

                                                                            })
                                                                        }
                                                                    })
                                                                }

                                                            })
                                                        }

                                                    })
                                                }
                                            })
                                        }

                                    })
                                }
                            });
                        }

                    })
            }

            if (req.body.category.toLowerCase() == "equipos") {

                // Inserto los datos en la tabla teams
                database.query(`INSERT INTO teams(id, title, text, author, category, date, views, fullName, foundation, president, stadium, coach, nickName, identifier) VALUES ('','${req.body.title}','${req.body.text}','${req.body.author}', 2,'${now}','','${req.body.fullName}','${req.body.foundation}','${req.body.president}','${req.body.stadium}','${req.body.coach}','${req.body.nickName}','${req.body.author + "-" + uniqueSuffix}');`,
                    (error) => {
                        if (error) {
                            return console.log(error);
                        } else {
                            console.log("Team created successfully");

                            // Selecciono el id de la fila creada
                            database.query(`SELECT id FROM teams WHERE identifier = "${req.body.author + "-" + uniqueSuffix}";`, function (err, result, filed) {
                                let idTeam;
                                if (err) {
                                    console.error(err);
                                } else {
                                    idTeam = result[0].id

                                    let tags = req.body.tags.split(",").map(tag => {
                                        return `('', "${tag}", "${uniqueSuffix}")`
                                    })

                                    // Inserto los tags en la tabla tags
                                    database.query(`INSERT INTO tags(id, tag, identifier) VALUES ${tags}`, (error) => {
                                        if (error) {
                                            return console.log(error)
                                        } else {
                                            console.log("Tags created successfully");

                                            // Selecciono los ids de los tags creados
                                            database.query(`SELECT id FROM tags WHERE identifier = "${uniqueSuffix}"`, function (err, result, filed) {
                                                let idsTags;
                                                if (err) {
                                                    console.error(err);
                                                } else {
                                                    idsTags = result.map(t => t.id);

                                                    let idArticleTags = idsTags.map(t => {
                                                        return `('', ${idTeam}, ${t})`
                                                    })

                                                    // Inserto el id de la fila teams y los ids de las filas tags
                                                    database.query(`INSERT INTO tagsteams(id, team_id, tag_id) VALUES ${idArticleTags}`, (error) => {
                                                        if (error) {
                                                            return console.log(error)
                                                        } else {
                                                            console.log("TagsTeams created successfully");

                                                            //Inserto la imagen en la tabla images
                                                            database.query(`INSERT INTO images(id, image, identifier) VALUES ('','${req.files[0].filename}','${uniqueSuffix}')`, (error) => {
                                                                if (error) {
                                                                    return console.log(error)
                                                                } else {
                                                                    console.log("Images created successfully");

                                                                    // Selecciono los ids de las images
                                                                    database.query(`SELECT id FROM images WHERE identifier = "${uniqueSuffix}"`, function (err, result, filed) {
                                                                        let idImage;
                                                                        if (err) {
                                                                            console.error(err);
                                                                        } else {
                                                                            idImage = result[0].id

                                                                            //Inserto el id de la fila teams y el id de la imagen
                                                                            database.query(`INSERT INTO imagesteams(id, team_id, image_id) VALUES ('','${idTeam}','${idImage}')`, (error) => {
                                                                                if (error) {
                                                                                    return console.log(error)
                                                                                } else {
                                                                                    console.log("imagesTeams created successfully");
                                                                                }

                                                                            })
                                                                        }
                                                                    })
                                                                }

                                                            })
                                                        }

                                                    })
                                                }
                                            })
                                        }

                                    })
                                }
                            });
                        }
                    })
            }

            if (req.body.category.toLowerCase() == "copas") {

                // Inserto los datos en la tabla thophies
                database.query(`INSERT INTO trophies(id, title, text, author, category, date, views, fullName, campus, foundation, organizer, champion, subchampion, identifier) VALUES ('','${req.body.title}','${req.body.text}','${req.body.author}', 3,'${now}','','${req.body.fullName}','${req.body.campus}','${req.body.foundation}','${req.body.organizer}','${req.body.champion}','${req.body.subchampion}','${req.body.author + "-" + uniqueSuffix}');`,
                    (error) => {
                        if (error) {
                            return console.log(error)
                        } else {
                            console.log("Trophy created successfully");

                            // Selecciono el id de la fila creada
                            database.query(`SELECT id FROM trophies WHERE identifier = "${req.body.author + "-" + uniqueSuffix}";`, function (err, result, filed) {
                                let idTrophy;
                                if (err) {
                                    console.error(err);
                                } else {
                                    idTrophy = result[0].id

                                    let tags = req.body.tags.split(",").map(tag => {
                                        return `('', "${tag}", "${uniqueSuffix}")`
                                    })

                                    // Inserto los tags en la tabla tags
                                    database.query(`INSERT INTO tags(id, tag, identifier) VALUES ${tags}`, (error) => {
                                        if (error) {
                                            return console.log(error)
                                        } else {
                                            console.log("Tags created successfully");

                                            // Selecciono los ids de los tags creados
                                            database.query(`SELECT id FROM tags WHERE identifier = "${uniqueSuffix}"`, function (err, result, filed) {
                                                let idsTags;
                                                if (err) {
                                                    console.error(err);
                                                } else {
                                                    idsTags = result.map(t => t.id);

                                                    let idArticleTags = idsTags.map(t => {
                                                        return `('', ${idTrophy}, ${t})`
                                                    })

                                                    // Inserto el id de la fila thopies y los ids de las filas tags
                                                    database.query(`INSERT INTO tagstrophies(id, thophy_id, tag_id) VALUES ${idArticleTags}`, (error) => {
                                                        if (error) {
                                                            return console.log(error)
                                                        } else {
                                                            console.log("TagsTrophies created successfully");

                                                            //Inserto la imagen en la tabla images
                                                            database.query(`INSERT INTO images(id, image, identifier) VALUES ('','${req.files[0].filename}','${uniqueSuffix}')`, (error) => {
                                                                if (error) {
                                                                    return console.log(error)
                                                                } else {
                                                                    console.log("Images created successfully");

                                                                    // Selecciono los ids de las images
                                                                    database.query(`SELECT id FROM images WHERE identifier = "${uniqueSuffix}"`, function (err, result, filed) {
                                                                        let idImage;
                                                                        if (err) {
                                                                            console.error(err);
                                                                        } else {
                                                                            idImage = result[0].id

                                                                            //Inserto el id de la fila trophies y el id de la imagen
                                                                            database.query(`INSERT INTO imagestrophies(id, thophy_id, image_id) VALUES ('','${idTrophy}','${idImage}')`, (error) => {
                                                                                if (error) {
                                                                                    return console.log(error)
                                                                                } else {
                                                                                    console.log("imagesTeams created successfully");
                                                                                }

                                                                            })
                                                                        }
                                                                    })
                                                                }

                                                            })
                                                        }

                                                    })
                                                }
                                            })
                                        }

                                    })
                                }
                            });
                        }
                    })
            }

            return res.status(200).json(`Tabla ${req.body.category} created successfully`);
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    categories: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;

                console.log("Using Database");
            })
            
            database.query(`SELECT category FROM categories`, function (err, result, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    let categories = result.map(c => {return c.category})

                    return res.status(200).json(categories);
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    detailPLayer: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
    
                console.log("Using Database");
            })
            console.log(req.params.id)
            database.query(`SELECT * FROM players WHERE id = ${req.params.id}`, function (err, result, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    return res.status(200).json(result);
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    detailTeam: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
    
                console.log("Using Database");
            })
            console.log(req.params.id)
            database.query(`SELECT * FROM teams WHERE id = ${req.params.id}`, function (err, result, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    return res.status(200).json(result);
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    detailTrophy: (req, res) => {
        try {
            database.query(`USE championpedia`, (error) => {
                if (error) throw error;
    
                console.log("Using Database");
            })
            console.log(req.params.id)
            database.query(`SELECT * FROM trophies WHERE id = ${req.params.id}`, function (err, result, filed) {
                if (err) {
                    return console.log(err)
                } else {
                    return res.status(200).json(result);
                }
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}