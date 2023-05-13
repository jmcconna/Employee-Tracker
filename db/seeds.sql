INSERT INTO departments (id, departmentName)
VALUES (001, "Operations"),
        (002, "Engineering"),
        (003, "Sales");

INSERT INTO roles (id, title, salary)
VALUES (001, "CEO", 250000),
        (002, "Account Executive", 90000),
        (003, "Technician", 65000),
        (004, "Project Manager", 120000),
        (005, "Engineer", 85000);

INSERT INTO employees (id, firstName, lastName, role_id, manager_id)
VALUES (001, "Joe", "Smith", 001, NULL),
        (002, "Bob", "Wig", 002, 001),
        (003, "Sally", "Forth", 003, 001),
        (004, "Candy", "Applebottom", 004, 001);