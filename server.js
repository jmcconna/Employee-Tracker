const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table");

const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username,
        user: 'root',
        //MySQL password
        password: 'Jamily!mySQL31',
        database: 'company_db'
    },
    console.log('Connected to the company_db database')
);

const menuOptions = ["View All Employees", "Add Employee", "Update Employee's Role", "Update Employee's Manager", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"];



const mainMenu = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'mainMenu',
        choices: menuOptions
    }
];

function viewAllEmployees() {

    db.query('SELECT employees.id, employees.firstName, employees.lastName, roles.title, departments.departmentName AS department, roles.salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id', function (err, results) {
        console.table(results);
        if (err) { console.log(err) }
        init();
    })
    //TODO - add Manager to display
    //FROM employees A, employees B
    //CONCAT(B.firstName, " ", B.lastName) AS Manager WHERE A.manager_id = B.id
    //INNER JOIN A ON A.manager_id = B.id'
};

async function getAllEmployees() { //helper function to fetch all current employees
    let employeeList;
    const results = await db.promise().query('SELECT firstName, lastName, id FROM employees');
    employeeList = results[0].map((employee) => {
        return { name: employee.firstName + " " + employee.lastName, value: employee.id }
    })
    return employeeList;
};

function viewAllRoles() {
    db.query('SELECT roles.id, roles.title, departments.departmentName as department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id', function (err, results) {
        console.table(results);
        if (err) { console.log(err) }
        init();
    })
};

async function getAllRoles() { //helper function to fetch all current roles
    let roleList;
    const results = await db.promise().query('SELECT title, id FROM roles');
    roleList = results[0].map((role) => {
        return { name: role.title, value: role.id }
    })
    return roleList;
};

function viewAllDepartments() {
    db.query('SELECT id, departmentName AS department FROM departments', function (err, results) {
        console.table(results);
        if (err) { console.log(err) }
        init();
    })
};

async function getAllDepts() { //helper function to fetch all current depts
    let deptList;
    const results = await db.promise().query('SELECT departmentName, id FROM departments');
    deptList = results[0].map((dept) => {
        return { name: dept.departmentName, value: dept.id }
    })
    return deptList;
};

const AddEmployeeData = [
    //enter first name
    {
        type: 'input',
        message: `What is the employee's first name?`,
        name: 'firstName',
    },
    //enter last name
    {
        type: 'input',
        message: `What is the employee's last name?`,
        name: 'lastName',
    },
    //enter role
    {
        type: 'list',
        message: `What is the employee's role?`,
        name: 'role',
        choices: getAllRoles
    },
    //enter manager
    {
        type: 'list',
        message: `Who is the employee's manager?`,
        name: 'manager',
        choices: getAllEmployees
    },
];

function addEmployee() {
    inquirer
        .prompt(AddEmployeeData)
        .then((data) => {
            const fname = data.firstName;
            const lname = data.lastName;
            const role = data.role;
            const manager = data.manager;
            db.query('INSERT INTO employees (firstName, lastName, role_id, manager_id) VALUES (?, ?, ?, ?)', [fname, lname, role, manager], init);
            console.log("Added " + fname + " " + lname + " to the database");
        })
};

const UpdateEmployeeRoleData = [  
    //which employee?
    {
        type: 'list',
        message: `Which employee's role do you want to update?`,
        name: 'employee',
        choices: getAllEmployees
    },
      //new role?
      {
        type: 'list',
        message: `Which role do you want to assign the selected employee?`,
        name: 'role',
        choices: getAllRoles
    },
];

function updateEmployeeRole() {
    inquirer
        .prompt(UpdateEmployeeRoleData)
        .then((data) => { 
            db.query('UPDATE employees SET role_id = ? WHERE id = ?', [data.role, data.employee], init)
            console.log("Updated employee's role")
        })
};

const UpdateEmployeeManagerData = [  
    //which employee?
    {
        type: 'list',
        message: `Which employee's manager do you want to update?`,
        name: 'employee',
        choices: getAllEmployees
    },
      //new role?
      {
        type: 'list',
        message: `Who is the employee's new manager?`,
        name: 'manager',
        choices: getAllEmployees //this will include the employee, which doesn't necessarily need to be fixed. Maybe the company allows self-management?
    },
];

function updateEmployeeManager() { //TODO - test this
    inquirer
        .prompt(UpdateEmployeeManagerData)
        .then((data) => { 
            db.query('UPDATE employees SET manager_id = ? WHERE id = ?', [data.manager, data.employee], init);
            console.log("Updated employee's manager")
        })
};

const AddRoleData = [
 
        //enter role name
        {
            type: 'input',
            message: `What is the name of the role?`,
            name: 'title',
        },
        //enter salary
        {
            type: 'input',
            message: `What is the salary of the role?`,
            name: 'salary',
        },
        //which dept?
        {
            type: 'list',
            message: `To which department does the role belong?`,
            name: 'dept',
            choices: getAllDepts
        },
];

function addRole() {
    inquirer
        .prompt(AddRoleData)
        .then((data) => { 
            const title = data.title;
            const salary = data.salary;
            const dept = data.dept;
            db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, dept], init);
            console.log("Added " + title + " to the database");
        })
};

const AddDepartmenData = [
    //enter department name
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'newDept'
    },
];

function addDepartment() {
    inquirer
        .prompt(AddDepartmenData)
        .then((data) => {
            db.query('INSERT INTO departments (departmentName) VALUES (?)', [data.newDept], init);
            console.log("Added " + data.newDept + " to the database");
        })
};


//Create a function to initialize app
function init() {
    inquirer
        .prompt(mainMenu)
        .then((data) => {
            switch (data.mainMenu) {

                //handle the view all employees case
                case menuOptions[0]:
                    //print all the employees
                    viewAllEmployees();
                    break;

                //handle the add employee case
                case menuOptions[1]:
                    //print all the employees
                    addEmployee();
                    break;

                //handle the update employee role case
                case menuOptions[2]:
                    //print all the employees
                    updateEmployeeRole();
                    break;

                //handle the update employee manager case
                case menuOptions[3]:
                    //print all the employees
                    updateEmployeeManager();
                    break;

                //handle the view all roles case
                case menuOptions[4]:
                    //print all the roles
                    viewAllRoles();
                    break;

                //handle the add role case
                case menuOptions[5]:
                    addRole();
                    break;

                //handle the view all departments case
                case menuOptions[6]:
                    //print all the departments
                    viewAllDepartments();
                    break;

                //handle the add department case
                case menuOptions[7]:
                    addDepartment();
                    break;

                //handle the QUIT case by ending the node app with process.exit(0)
                case menuOptions[8]:
                    process.exit(0);
            }
        }
        )
}

// Function call to initialize app
init();


