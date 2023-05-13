DROP DATABASE IF EXISTS movie_db;
CREATE movie_db;

USE movie_db;

CREATE TABLE movies (
 id INT NOT NULL,
 movie_name VARCHAR(100) NOT NULL
);

CREATE TABLE reviews (
    id INT NOT NULL,
    movie_id INT NOT NULL,
    review TEXT NOT NULL
);