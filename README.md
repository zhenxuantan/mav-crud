# CRUD Application (Backend)

Allows the management of employees

## Getting started

- Install NodeJS, VSCode, and Yarn, then pull from the repository
- Install Postman for testing, and PostgreSQL for the database
- For running without Docker:
  - Run `yarn install` then run `yarn start`.
- For running with Docker (install Docker first):
  - Run Docker application
  - Run `docker-compose up --build`

## Operations

### Employees

| Request Type | URL                  | Description                                   |
| ------------ | -------------------- | --------------------------------------------- |
| `GET`        | `/employee`          | Returns all the employees                     |
| `POST`       | `/employee`          | Creates a new employee                        |
| `GET`        | `/employee/{emp_id}` | Get an employee with the given id             |
| `PUT`        | `/employee/{emp_id}` | Update the employee details with the given id |
| `DELETE`     | `/employee/{emp_id}` | Delete the employee with the given id         |

### Users

| Request Type | URL                  | Description                                                |
| ------------ | -------------------- | ---------------------------------------------------------- |
| `POST`       | `/auth/login`        | Logs in the user and sets HttpOnly cookie on client's side |
| `POST`       | `/auth/logout`       | Logs out the user and remove the cookie                    |
| `POST`       | `/auth`              | Registers the new user                                     |
| `GET`        | `/auth/token`        | Checks whether the user is logged in or not                |
| `PATCH`      | `/employee/{emp_id}` | Delete the employee with the given id                      |

## Libraries and Dependencies

| Library / Dependency | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| TypeScript           | Superset of JavaScript and gives type-checking functionalities |
| Joi                  | Helps to validate data                                         |
| Express              | Backend web application framework for Node.js                  |
| pg                   | For PostgreSQL operations                                      |
| lodash               | Allow the deep comparison of objects                           |
| sequelize            | Backend library for PostgreSQL                                 |
| jsonwebtoken         | For persistance in logged in status                            |
| dotenv               | For using environment variables                                |
| cookie-parser        | Allow for the verification of the cookie                       |
| bcryptjs             | Hashing of passwords                                           |

## Version History

- 0.3
  - Implemented authentication
  - Implemented redux
  - Dockerize application
  - All User (authentication) functions works
- 0.2
  - Implemented with PostgreSQL with sequelize
  - See `pool` branch for implementation without sequelize
- 0.1
  - Initial Release without using PostgreSQL
  - All Employee functions works
