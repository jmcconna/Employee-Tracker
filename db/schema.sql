
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
 id INT NOT NULL, 
 departmentName VARCHAR(30),
PRIMARY KEY (id) 
);

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);