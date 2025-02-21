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



mkdir node-auth-crud && cd node-auth-crud
npm init -y
npm install express mysql2 bcryptjs jsonwebtoken dotenv cors nodemailer passport passport-google-oauth20 passport-facebook cookie-parser crypto

Create Database & Tables

CREATE DATABASE node_auth_crud;

USE node_auth_crud;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'superadmin') DEFAULT 'user',
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    google_id VARCHAR(255),
    facebook_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

Step 3: Create Project Structure
node-auth-crud/
│── config/
│   ├── db.js
│   ├── passport.js
│── controllers/
│   ├── authController.js
│   ├── taskController.js
│── middlewares/
│   ├── authMiddleware.js
│── models/
│   ├── userModel.js
│   ├── taskModel.js
│── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│── utils/
│   ├── emailService.js
│── .env
│── server.js
│── package.json

Step 4: Configure MySQL Database Connection (config/db.js)
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) console.error("Database Connection Error:", err);
    else console.log("Connected to MySQL Database");
});

module.exports = db;
 Step 5: Implement JWT Authentication (controllers/authController.js)
 const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../config/db");
const { sendVerificationEmail } = require("../utils/emailService");

// User Signup
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    db.query("INSERT INTO users (name, email, password, role, verification_token) VALUES (?, ?, ?, ?, ?)",
        [name, email, hashedPassword, role || "user", verificationToken],
        async (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            await sendVerificationEmail(email, verificationToken);
            res.status(201).json({ message: "User registered. Please verify your email." });
        });
};

// Email Verification
exports.verifyEmail = (req, res) => {
    const { token } = req.params;

    db.query("UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = ?", [token],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(400).json({ error: "Invalid token" });

            res.json({ message: "Email verified successfully" });
        });
};

// User Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(400).json({ error: "User not found" });

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.status(401).json({ error: "Invalid credentials" });
        if (!user.is_verified) return res.status(403).json({ error: "Please verify your email first" });

        const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

        res.json({ accessToken, refreshToken });
    });
};

// Refresh Token
exports.refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: "Refresh token required" });

    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid refresh token" });

        const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
        res.json({ accessToken });
    });
};
Step 6: Middleware for Role-Based Access (middlewares/authMiddleware.js)
const jwt = require("jsonwebtoken");

exports.authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied, no token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });

        req.user = user;
        next();
    });
};

exports.authorizeRole = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Access denied" });
    next();
};
Step 7: Implement CRUD with Pagination & Filtering (controllers/taskController.js)
const db = require("../config/db");

// Create Task
exports.createTask = (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    db.query("INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)", [title, description, userId],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Task created", taskId: result.insertId });
        });
};

// Get Tasks with Pagination & Filtering
exports.getTasks = (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM tasks WHERE title LIKE ? LIMIT ? OFFSET ?";
    let params = [`%${search}%`, parseInt(limit), parseInt(offset)];

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Update Task (Only Owner or Admin)
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Task not found" });

        const task = results[0];
        if (task.user_id !== userId && userRole !== "admin") return res.status(403).json({ error: "Unauthorized" });

        db.query("UPDATE tasks SET title = ?, description = ? WHERE id = ?", [title, description, id],
            (updateErr) => {
                if (updateErr) return res.status(500).json({ error: updateErr.message });
                res.json({ message: "Task updated successfully" });
            });
    });
};

// Delete Task (Only Owner or Admin)
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Task not found" });

        const task = results[0];
        if (task.user_id !== userId && userRole !== "admin") return res.status(403).json({ error: "Unauthorized" });

        db.query("DELETE FROM tasks WHERE id = ?", [id], (deleteErr) => {
            if (deleteErr) return res.status(500).json({ error: deleteErr.message });
            res.json({ message: "Task deleted successfully" });
        });
    });
};
 Step 8: Setup Routes (routes/authRoutes.js & routes/taskRoutes.js)
Authentication Routes (routes/authRoutes.js)
const express = require("express");
const { signup, verifyEmail, login, refreshToken } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.get("/verify/:token", verifyEmail);
router.post("/login", login);
router.post("/refresh-token", refreshToken);

module.exports = router;
Task Routes (routes/taskRoutes.js)
const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const { authenticateJWT, authorizeRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticateJWT, createTask);
router.get("/", authenticateJWT, getTasks);
router.put("/:id", authenticateJWT, updateTask);
router.delete("/:id", authenticateJWT, deleteTask);

module.exports = router;
Step 9: Run Server (server.js)
// Import required modules
const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL");
        createDatabaseAndTables();
    }
});

// Function to create database and tables
function createDatabaseAndTables() {
    db.query("CREATE DATABASE IF NOT EXISTS node_auth_crud", (err) => {
        if (err) throw err;
        console.log("Database created or already exists");
        db.query("USE node_auth_crud", (err) => {
            if (err) throw err;
            console.log("Using node_auth_crud");
            const usersTable = `CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin', 'superadmin') DEFAULT 'user',
                is_verified BOOLEAN DEFAULT FALSE,
                verification_token VARCHAR(255),
                reset_token VARCHAR(255),
                google_id VARCHAR(255),
                facebook_id VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
            db.query(usersTable, (err) => {
                if (err) throw err;
                console.log("Users table created or already exists");
            });
            const tasksTable = `CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )`;
            db.query(tasksTable, (err) => {
                if (err) throw err;
                console.log("Tasks table created or already exists");
            });
        });
    });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//////
Implement Advanced Filtering (Date Range, Status, Sorting)
🔹 Current Approach: We only filter by task title.
🔹 Advanced Task: Add filters for date range, status, and sorting.

Steps to Implement:
Modify getTasks in taskController.js:
exports.getTasks = (req, res) => {
    const { page = 1, limit = 10, search = "", startDate, endDate, sort = "created_at", order = "DESC" } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM tasks WHERE deleted_at IS NULL AND title LIKE ?";
    let params = [`%${search}%`];

    if (startDate && endDate) {
        query += " AND created_at BETWEEN ? AND ?";
        params.push(startDate, endDate);
    }

    query += ` ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
This allows users to filter tasks by:
✅ Date Range (startDate, endDate)
✅ Sorting (sort=title, order=ASC or DESC)

3️⃣ Implement Multi-Role Permissions in CRUD
🔹 Current Approach: Only admins can delete tasks they don't own.
🔹 Advanced Task:

Super Admin can manage all tasks.
Admin can only manage user tasks.
Users can only manage their own tasks.
Steps to Implement:
Modify updateTask & deleteTask logic:

if (task.user_id !== userId && userRole !== "admin" && userRole !== "superadmin") {
    return res.status(403).json({ error: "Unauthorized" });
}


////mongodb

myapp/
│── server.js
│── .env
│── package.json
│── config/
│   ├── db.js                <-- MongoDB Connection
│   ├── passport.js          <-- Google & Facebook Auth
│── models/
│   ├── User.js              <-- User Schema
│   ├── Task.js              <-- Task Schema
│── controllers/
│   ├── authController.js     <-- Authentication
│   ├── taskController.js     <-- CRUD & Filtering
│── middleware/
│   ├── authenticate.js       <-- JWT Middleware
│   ├── roleCheck.js          <-- Role-Based Access Control
│── routes/
│   ├── authRoutes.js         <-- Auth Endpoints
│   ├── taskRoutes.js         <-- Task CRUD Endpoints
│── utils/
│   ├── generateToken.js      <-- JWT Token Generator
│   ├── sendEmail.js          <-- Email Sending Helper
│── README.md

1. config/db.js (MongoDB Connection)
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

2. config/passport.js (Google & Facebook Auth)

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ google_id: profile.id });
      if (!user) {
        user = await User.create({ name: profile.displayName, email: profile.emails[0].value, google_id: profile.id });
      }
      return done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ facebook_id: profile.id });
      if (!user) {
        user = await User.create({ name: profile.displayName, email: profile.emails[0].value, facebook_id: profile.id });
      }
      return done(null, user);
    }
  )
);

3. middleware/authenticate.js (JWT Middleware)

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authenticate;

4. middleware/roleCheck.js (Role-Based Access)
const roleCheck = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: You do not have permission" });
  }
  next();
};

module.exports = roleCheck;

5. models/User.js (User Schema)
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "superadmin"], default: "user" },
  is_verified: { type: Boolean, default: false },
  verification_token: { type: String },
  reset_token: { type: String },
  google_id: { type: String },
  facebook_id: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);

6. models/Task.js (Task Schema)
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", TaskSchema);

7. utils/generateToken.js (JWT Generator)
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = generateToken;

8. utils/sendEmail.js (Email Helper)
const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
};

module.exports = sendEmail;

9. routes/authRoutes.js (Auth Endpoints)
const express = require("express");
const { register, verifyEmail, googleLogin, googleCallback } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.get("/verify/:token", verifyEmail);
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

module.exports = router;

10. routes/taskRoutes.js (CRUD & Filtering)
const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const roleCheck = require("../middleware/roleCheck");
const router = express.Router();

router.get("/", getTasks);
router.post("/", roleCheck(["admin", "superadmin"]), createTask);
router.put("/:id", roleCheck(["admin", "superadmin"]), updateTask);
router.delete("/:id", roleCheck(["admin", "superadmin"]), deleteTask);

module.exports = router;









