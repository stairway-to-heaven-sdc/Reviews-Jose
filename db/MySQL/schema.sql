DROP DATABASE IF EXISTS yelp;

CREATE DATABASE yelp;
USE yelp;


CREATE TABLE business (
    id INT NOT NULL,
    PRIMARY KEY (id)
);

-- one review to many useful (users) relation
CREATE TABLE useful (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(128), 
    userId INT,
    PRIMARY KEY (id)
);

CREATE TABLE funny (
    id INT AUTO_INCREMENT,
    username VARCHAR(128),
    userId INT,
    PRIMARY KEY (id)
);

CREATE TABLE cool (
    id INT AUTO_INCREMENT,
    username VARCHAR(128),
    userId INT,
    PRIMARY KEY (id)
);
-- reviews 
CREATE TABLE reviews (
    _id INT NOT NULL AUTO_INCREMENT,
    business_id INT NOT NULL,
    userId INT,
    rating INT,
    reviewText TEXT,
    checkin Boolean,
    usefulId INT, 
    funnyId INT,
    coolId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(_id),
    INDEX par_ind (business_id)
    
);
