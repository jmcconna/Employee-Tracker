const inquirer = require('inquirer');

const menuOptions = ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"];



const mainMenu = [
    {
      type: 'checkbox',
      message: 'What would you like to do?',
      name: 'mainMenu',
      choices: menuOptions
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
        .then((data) => {
        switch(data.mainMenu[0]) {
            //handle the view all employees case
            case menuOptions[0]:
                //print all the employees
                //go back to the main menu
                break;
        //handle the view all roles case
        case menuOptions[3]:
            //print all the employees
            //go back to the main menu
            break;
        //handle the view all departments case
        case menuOptions[5]:
            //print all the employees
            //go back to the main menu
            break;
        //handle the add employee case
        //handle the add role case
        //handle the add department case
        }
        }
        )
}

// Function call to initialize app
init();