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

const menuOptions = ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"];



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
        if(err) {console.log(err)}
        init();
    })
    //FROM employees A, employees B
    //CONCAT(B.firstName, " ", B.lastName) AS Manager WHERE A.manager_id = B.id
    //INNER JOIN A ON A.manager_id = B.id'
};

async function getAllEmployees() { //helper function to fetch all current employees
    let employeeList;
    const results = await db.promise().query('SELECT firstName, lastName, id FROM employees');
    employeeList = results[0].map((employee)=> {
        return {name: employee.firstName + " " +employee.lastName, value: employee.id}
    })
    return employeeList;
};

function viewAllRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.log(results);
        if(err) {console.log(err)}
        init();
    })
};

async function getAllRoles() { //helper function to fetch all current roles
    let roleList;
    const results = await db.promise().query('SELECT title, id FROM roles');
    roleList = results[0].map((role)=> {
        return {name: role.title, value: role.id}
    })
    return roleList;
};

function viewAllDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.log(results);
        if(err) {console.log(err)}
        init();
    })
};

async function getAllDepts() { //helper function to fetch all current roles
    let deptList;
    const results = await db.promise().query('SELECT departmentName, id FROM departments');
    deptList = results[0].map((dept)=> {
        return {name: dept.departmentName, value: dept.id}
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
        //retrieve list of current employees for possible managers

    inquirer
        .prompt(AddEmployeeData)
        .then((data) => { 
            const fname = data.firstName;
            const lname = data.lastName;
            const role = data.role; //list logic
            const manager = data.manager; //list logic
            db.query('INSERT INTO employees (firstName, lastName, role_id, manager_id) VALUES (?, ?, ?, ?)',[fname, lname, role, manager] ,init)
            
        })
};

const UpdateEmployeeData = [  //TODO
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
        type: 'input',
        message: `What is the employee's role?`,
        name: 'role',
    },
    //enter manager
    {
        type: 'input',
        message: `Who is the employee's manager?`,
        name: 'manager',
    },
];

function updateEmployee() {
    inquirer
        .prompt(UpdateEmployeeData)
        .then((data) => { })
};

const AddRoleData = [
    //enter role name
    //enter salary
    //enter department
];

function addRole() {
    inquirer
        .prompt(AddRoleData)
        .then((data) => { })
};

const AddDepartmenData = [
    //enter department name
    {
        type: 'input',
        message: 'Enter department name: ',
        name: 'departmentName',
    },
];

function addDepartment() {
    inquirer
        .prompt(AddDepartmenData)
        .then((data) => { })
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
                    console.log("You selected: View All Employees")
                    viewAllEmployees();
                    break;

                //handle the add employee case
                case menuOptions[1]:
                    //print all the employees
                    console.log("You selected: Add Employee")
                    addEmployee();
                    break;


                //handle the update employee case
                case menuOptions[2]:
                    //print all the employees
                    console.log("You selected: Update Employee")
                    updateEmployee();
                    break;


                //handle the view all roles case
                case menuOptions[3]:
                    //print all the roles
                    console.log("You selected: View All Roles")
                    viewAllRoles();
                    //go back to the main menu
                    init();
                    break;

                //handle the add role case

                //handle the view all departments case
                case menuOptions[5]:
                    //print all the departments
                    console.log("You selected: View All Departments")
                    viewAllDepartments();
                    //go back to the main menu
                    init();
                    break;
                
                //handle the add department case
                case menuOptions[6]:
                    console.log("You selected: Add Department")
                    addDepartment();
                    //go back to the main menu
                    init();
                    break;

                //handle the QUIT case by ending the node app with process.exit(0)
                case menuOptions[7]:
                    process.exit(0);
            }
        }
        )
}

// Function call to initialize app
init();


