const database = require('../sql/dbConnection');

module.exports = {
    create: (req, res) => {

        database.query(`CREATE DATABASE championpedia`, (err) => {
            if (err) throw err;

            console.log("Database Created Successfully !");
        })

        database.query(`USE championpedia`, (error) => {
            if (error) throw error;

            console.log("Using Database");
        })

        database.query(`CREATE TABLE tags (
            id int(11) not null unique auto_increment,
            tag varchar(50) not null,

            primary key (id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of tags created successfully");
        })

        database.query(`CREATE TABLE categories (
            id int(11) not null unique auto_increment,
            category varchar(50) not null,

            primary key (id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of categories created successfully");
        })

        database.query(`CREATE TABLE images (
            id int(11) not null unique auto_increment,
            image blob,
            
            primary key (id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of images created successfully");
        })

        database.query(`CREATE TABLE players (
            id int(11) not null unique auto_increment,
            title varchar(100) not null,
            text text not null,
            author varchar(50) not null,
            category int(11) not null,
            date datetime not null,
            views int(11) null,
            fullName varchar(100) not null,
            nickName varchar(50) null,
            born datetime not null,
            death datetime null,
            height float not null,
            weight float not null,
            nationality varchar(50) not null,
            position varchar(100) not null,
            team varchar(100) not null,
            numbers varchar(100) not null,
            goals int(11) not null,
            debut datetime not null,
            retire datetime null,
            
            primary key (id),
            foreign key (category) references categories(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of players created successfully");
        })

        database.query(`CREATE TABLE thophies (
            id int(11) not null unique auto_increment,
            title varchar(100) not null,
            text text not null,
            author varchar(50) not null,
            category int(11) not null,
            date datetime not null,
            views int(11) null,
            fullName varchar(100) not null,
            campus varchar(100) not null,
            foundation datetime not null,
            organizer varchar(100) not null,
            champion varchar(100) not null,
            suchampion varchar(100) not null,
        
            primary key (id),
            foreign key (category) references categories(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of thophies created successfully");
        })

        database.query(`CREATE TABLE teams (
            id int(11) not null unique auto_increment,
            title varchar(100) not null,
            text text not null,
            author varchar(50) not null,
            category int(11) not null,
            date datetime not null,
            views int(11) not null,
            fullName varchar(100) not null,
            foundation datetime not null,
            president varchar(100) not null,
            stadium varchar(100) not null,
            coach varchar(100) not null,
            nickName varchar(50) null,
            
            primary key (id),
            foreign key (category) references categories(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of teams created successfully");
        })

        database.query(`CREATE TABLE tagsArticles (
            id int(11) not null unique auto_increment,
            article_id int(11) not null,
            tag_id int(11) not null,
            
            primary key (id),
            foreign key (tag_id) references tags(id),
            foreign key (article_id) references players(id),
            foreign key (article_id) references thophies(id),
            foreign key (article_id) references teams(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of tagsArticles created successfully");
        })

        database.query(`CREATE TABLE imagesArticles (
            id int(11) not null unique auto_increment,
            article_id int(11) not null,
            image_id int(11) not null,
            
            primary key (id),
            foreign key (image_id) references images(id),
            foreign key (article_id) references players(id),
            foreign key (article_id) references thophies(id),
            foreign key (article_id) references teams(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of imagesArticles created successfully");
        })

        database.query(`INSERT INTO categories (id, category)
            values ("1", "Futbolistas"),("2", "Equipos"),("3", "Copas")
        ;`, (error) => {
            if (error) throw error;

            console.log("table categories completed");
        })

        return res.send(`Database created with all its tables and relations`)
    }
}