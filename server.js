const inquirer = require('inquirer');





const mainMenu = [
    {
      type: 'checkbox',
      message: 'What would you like to do?',
      name: 'mainMenu',
      choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
     }
    ];

const AddEmployee = [
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

const AddRole = [
    //enter role name
    //enter salary
    //enter department
  ];

const AddDepartment = [
    //enter department name
  ];


  //Create a function to initialize app
function init() {
    inquirer
        .prompt(mainMenu)
        //.then((data) => {
        //handle the view all employees case
        //handle the view all roles case
        //handle the view all departments case
        //handle the add employee case
        //handle the add role case
        //handle the add department case
        //}
        //)
}

// Function call to initialize app
init();