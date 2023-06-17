const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host:'localhost',
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
      type: 'checkbox',
      message: 'What would you like to do?',
      name: 'mainMenu',
      choices: menuOptions
     }
    ];

function viewAllEmployees() {
    db.query('SELECT * FROM employees', function(err, results) {
        console.log(results);
    })
};

function viewAllRoles() {
    db.query('SELECT * FROM roles', function(err, results) {
        console.log(results);
    })
};

function viewAllDepartments() {
    db.query('SELECT * FROM departments', function(err, results) {
        console.log(results);
    })
};

const AddEmployeeData = [
    //enter first name
    {
        type: 'input',
        message: 'Enter first name: ',
        name: 'firstName',
    },
    //enter last name
    {
        type: 'input',
        message: 'Enter last name: ',
        name: 'lastName',
    },
    //enter role
    {
        type: 'input',
        message: 'Enter role: ',
        name: 'role',
    },
    //enter manager
    {
        type: 'input',
        message: 'Enter manager: ',
        name: 'manager',
    },
  ];

function addEmployee() {

};

const AddRoleData = [
    //enter role name
    //enter salary
    //enter department
  ];

function addRole() {

};

const AddDepartmenData = [
    //enter department name
  ];


  //Create a function to initialize app
function init() {
    inquirer
        .prompt(mainMenu)
        .then((data) => {
        switch(data.mainMenu[0]) {
            //handle the view all employees case
            
            case menuOptions[0]:
                //print all the employees
                console.log("You selected: View All Employees")
                viewAllEmployees();
                //go back to the main menu
                init();
                break;
        //handle the view all roles case
        case menuOptions[3]:
            //print all the roles
            console.log("You selected: View All Roles")
                viewAllRoles();
                //go back to the main menu
                init();
                break;
            //go back to the main menu
            // if they want to coninue then call init();
            break;
        //handle the view all departments case
        case menuOptions[5]:
            //print all the departments
            console.log("You selected: View All Departments")
                viewAllDepartments();
                //go back to the main menu
                init();
                break;
            //go back to the main menu
            break;
        //handle the add employee case
            //case
                //.prompt(AddEmployeeData)
        //handle the add role case
        //handle the add department case

        //handle the QUIT case by ending the node app maybe with process.exit(0)
        }
        }
        )
}

// Function call to initialize app
init();


