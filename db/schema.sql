### Schema

CREATE DATABASE burgers_db;
USE burger_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	time_stamp NOT NULL, 
	PRIMARY KEY (id)
);
