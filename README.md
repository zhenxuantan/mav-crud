# CRUD Application

Allows the management of employees

## Getting started

- Install NodeJS and VSCode, then pull from the repository
- Install Postman for testing, and PostgreSQL for the database
- Run `npm install` on the first terminal and `tsc -w` on the second, then run `npm start` on the first terminal.

## Operations

- **GET**: `/employee` Returns all the employees
- **POST**: `/employee` Creates a new employee
- **GET**: `/employee/{emp_id}` Get an employee with the given id
- **PUT**: `/employee/{emp_id}` Update the employee details with the given id
- **DELETE**: `/employee/{emp_id}` Delete the employee with the given id

## Version History

- 0.2
  - Implemented with PostgreSQL with sequelize
  - See `pool` branch for implementation without sequelize
- 0.1
  - Initial Release without using PostgreSQL
