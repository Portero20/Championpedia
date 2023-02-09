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
            image text not null,

            primary key (id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of images created successfully");
        })

        database.query(`CREATE TABLE players (
            id int(11) not null unique auto_increment,
            title varchar(100) not null,
            text mediumtext not null,
            author varchar(50) not null,
            category int(11) not null,
            date datetime not null,
            views int(11) null,
            fullName varchar(50) not null,
            nickName varchar(100) null,
            born date not null,
            death date null,
            height decimal(3, 2) not null,
            weight decimal(4, 1) not null,
            nationality varchar(50) not null,
            position varchar(100) not null,
            team varchar(100) not null,
            numbers varchar(100) not null,
            goals int(11) not null,
            debut date not null,
            retire date null,
            
            primary key (id),
            foreign key (category) references categories(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of players created successfully");
        })

        database.query(`CREATE TABLE trophies (
            id int(11) not null unique auto_increment,
            title varchar(100) not null,
            text mediumtext not null,
            author varchar(50) not null,
            category int(11) not null,
            date datetime not null,
            views int(11) null,
            fullName varchar(100) not null,
            campus varchar(100) not null,
            foundation date not null,
            organizer varchar(100) not null,
            champion varchar(100) not null,
            subchampion varchar(100) not null,
        
            primary key (id),
            foreign key (category) references categories(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of trophies created successfully");
        })

        database.query(`CREATE TABLE teams (
            id int(11) not null unique auto_increment,
            title varchar(100) not null,
            text mediumtext not null,
            author varchar(50) not null,
            category int(11) not null,
            date datetime not null,
            views int(11) not null,
            fullName varchar(100) not null,
            foundation date not null,
            president varchar(50) not null,
            stadium varchar(100) not null,
            coach varchar(50) not null,
            nickName varchar(100) null,
            
            primary key (id),
            foreign key (category) references categories(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of teams created successfully");
        })

        database.query(`CREATE TABLE tagsTrophies (
            id int(11) not null unique auto_increment,
            thophy_id int(11) not null,
            tag_id int(11) not null,
            
            primary key (id),
            foreign key (tag_id) references tags(id),
            foreign key (thophy_id) references trophies(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of tagsTrophies created successfully");
        })

        database.query(`CREATE TABLE tagsPlayers (
            id int(11) not null unique auto_increment,
            player_id int(11) not null,
            tag_id int(11) not null,
            
            primary key (id),
            foreign key (tag_id) references tags(id),
            foreign key (player_id) references players(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of tagsPlayers created successfully");
        })

        database.query(`CREATE TABLE tagsTeams (
            id int(11) not null unique auto_increment,
            team_id int(11) not null,
            tag_id int(11) not null,
            
            primary key (id),
            foreign key (tag_id) references tags(id),
            foreign key (team_id) references teams(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of tagsTeams created successfully");
        })

        database.query(`CREATE TABLE imagesTrophies (
            id int(11) not null unique auto_increment,
            thophy_id int(11) not null,
            image_id int(11) not null,
            
            primary key (id),
            foreign key (image_id) references images(id),
            foreign key (thophy_id) references trophies(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of imagesTrophies created successfully");
        })

        database.query(`CREATE TABLE imagesPlayers (
            id int(11) not null unique auto_increment,
            player_id int(11) not null,
            image_id int(11) not null,
            
            primary key (id),
            foreign key (image_id) references images(id),
            foreign key (player_id) references players(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of imagesPlayers created successfully");
        })

        database.query(`CREATE TABLE imagesTeams (
            id int(11) not null unique auto_increment,
            team_id int(11) not null,
            image_id int(11) not null,
            
            primary key (id),
            foreign key (image_id) references images(id),
            foreign key (team_id) references teams(id)
        );`, (error) => {
            if (error) throw error;

            console.log("Table of imagesTeams created successfully");
        })

        database.query(`INSERT INTO categories (id, category)
            values ("1", "Futbolistas"),("2", "Equipos"),("3", "Copas")
        ;`, (error) => {
            if (error) throw error;

            console.log("Table categories completed");
        })

        return res.send(`Database created with all its tables and relations`)
    }
}