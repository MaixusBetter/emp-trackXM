
const mysql = require('mysql2/promise'); // Assuming you're using mysql2

import pkg from 'inquirer';

const { prompt } = pkg;

//User input to define shape and text
const questions = [
    {
        type: 'list',
        name: 'UserSelect',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Exit'],
    },
    ,
  {
    type: 'input',
    name: 'departmentName',
    message: 'Enter department name:',
    when: (answers) => answers.UserSelect === 'add a department',
  },
  {
    type: 'input',
    name: 'roleTitle',
    message: 'Enter role title:',
    when: (answers) => answers.UserSelect === 'add a role',
  },
  {
    type: 'number',
    name: 'salary',
    message: 'Enter salary:',
    when: (answers) => answers.UserSelect === 'add a role',
  },
  {
    type: 'input',
    name: 'firstName',
    message: 'Enter employee first name:',
    when: (answers) => answers.UserSelect === 'add an employee',
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'Enter employee last name:',
    when: (answers) => answers.UserSelect === 'add an employee',
  },
  {
    type: 'number',
    name: 'roleId',
    message: 'Enter role ID for the employee:',
    when: (answers) => answers.UserSelect === 'add an employee',
  },
  {
    type: 'number',
    name: 'employeeId',
    message: 'Enter employee ID:',
    when: (answers) => answers.UserSelect === 'update employee role',
  },
  {
    type: 'number',
    name: 'newRoleId',
    message: 'Enter new role ID for the employee:',
    when: (answers) => answers.UserSelect === 'update employee role',
  },
];


async function init() {
   try {
      const connection = await mysql.createConnection({
         host: 'your_host', // Replace with your database host
         user: 'your_username', // Replace with your database username
         password: 'your_password', // Replace with your database password
         database: 'your_database', // Replace with your database name
       });

       const answers = await prompt(questions);
       const SelectionU= answers.UserSelect.toLowerCase();

       switch (SelectionU) {
         case 'view all departments':
           console.log('Viewing all departments...');
           const [departments] = await connection.execute(
            'SELECT * FROM departments' // Replace with your query to fetch departments
          );
          console.table(departments);
           break;
         case 'view all roles':
           console.log('Viewing all roles...');
           console.log('Viewing all roles...');
           const [roles] = await connection.execute(
             'SELECT * FROM roles' // Replace with your query to fetch roles
           );
           console.table(roles);
           break;
         case 'view all employees':
            console.log('Viewing all employees...');
            const [employees] = await connection.execute(
              'SELECT * FROM employees' // Replace with your query to fetch employees
            );
            console.table(employees);
           break;

         case 'exit':
           console.log('Exiting application...');
           break;
         default:
           console.log('Invalid choice.');
       }

   } catch (err) {
       console.error(`[ERROR] Error prompting user: ${err}`);
   }
}

init();
