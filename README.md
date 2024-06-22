# Full Stack Developer Task

Clone this repository using https://github.com/jagruti-a/fullstack-developer-task.git

## Task 1 : Frontend React Application for Anime Character Search 
## Overview

Anime Character Search is a React-based web application that allows users to search for anime characters and view detailed information about them. The project uses Material-UI for styling and Axios for fetching data from an API.

## Setup
```bash
cd .\Task-1\anime-character-search\
```
### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Dependencies

- React
- Material-UI
- Axios

### Installation

- Install the dependencies
```bash
npm install or yarn install 
```

- Running the Application
To start the application in development mode, use
```bash
npm start or yarn start
```
The application will be available at http://localhost:3000.

### Usage

- Search Form

The search form allows users to enter a query to search for anime characters. It includes a search icon within the text field for better user experience.

- Character Cards

Search results are displayed in the form of character cards. Each card contains:

1. Character image

2. Character name

3. List of nicknames

4. Number of favorites (with a red heart icon)

5. A link to view more details (opens in a new tab)

- Pagination

Pagination controls are available to navigate through the search results.

## Task 2 : Backend application for User Management System 
## Overview

This project is a simple User Management System built with Node.js, Express, and MySQL. It provides functionalities for creating users, associating addresses with users, and searching for users based on various criteria.

## Setup
```bash
cd .\Task-2
```

### Prerequisites

- Node.js (>= 14.x)
- MySQL (>= 5.7) 

### Dependencies

- express: A minimal and flexible Node.js web application framework.
- body-parser: Node.js body parsing middleware.
- mysql2: A MySQL client for Node.js with a focus on performance.

### Installation
- Install the dependencies
```bash
npm install or yarn install 
```

### Database Setup
- Create a MySQL database
```bash
CREATE DATABASE user_management;
```

### Update the database configuration

- Modify the config/database.js file to match your MySQL configuration

```bash
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_management',
});

module.exports = { pool, initDB };
```

### Initialize the database

- The database tables will be automatically created when you start the server for the first time.

### Seeding the Database

- To seed the database with initial data, run

```bash
npm run seed
```

### Running the Server

- Start the server with the following command:

```bash
npm start
```
The server will start on port 3000.

### Validation Middleware

- This project uses custom middleware for request validation. The validation rules are defined in validators/userValidator.js.

- Added this validation middleware to routes as follows

```bash 
const { validateUser } = require('../validators/userValidator');

app.post('/users', validateUser, userController.createUser);
```

### API Endpoints

- Create User

```bash 
POST /api/users
```

- Request Body

```bash 
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "mobile": "1234567890",
  "birthdate": "1990-01-01",
  "addresses": [
    {
      "address_line1": "123 Main St",
      "address_line2": "Apt 4",
      "pincode": "123456",
      "city": "Cityname",
      "state": "State",
      "type": "Home"
    }
  ]
}
```

- Get All Users

```bash 
GET /api/users
```

- Search Users

```bash
GET /api/users/search?searchString=john&age=<=30&city=Cityname
```

### Postman API collection

- Added postman api collection in User Management Api.postman_collection.json file


## Task 3 : Logical Tasks

## Overview

This Logical Task is having two programs one is to print pattern and other one is to print fibonacci series performed using javascript.

## Setup
```bash
cd .\Task-3
```

- To run the first program,
```bash
node pattern.js
```
- Input : Please enter your lucky number: 5
- Output :
```bash
        1
      1 3 A
    1 3 5 A B
  1 3 5 7 A B C
1 3 5 7 9 A B C D
  1 3 5 7 A B C
    1 3 5 A B
      1 3 A
        1
```

- To run the second program,
```bash
node fibonacci.js
```
- Input : Enter a number: 120
- Output :
```bash
Fibonacci series up to 120:
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
```