CREATE DATABASE orderly_db;

USE orderly_db;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    promotion VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255)
);
