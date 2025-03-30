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



/// config 
// config/aws.js
const AWS = require("aws-sdk");
require("dotenv").config();

/ Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

module.exports = s3;

//config/cloudinary.js
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;

//config/db_mongo.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;

//config/db_mysql.js
const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Raw MySQL Connection
const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
});

// Sequelize Connection
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
});

module.exports = { mysqlPool, sequelize };

//config/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("../firebase-service-account.json"); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
});

const bucket = admin.storage().bucket();

module.exports = bucket;

//config/googleAuth.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserSequelize = require("../models/mysql/User");
const UserMongo = require("../models/mongo/User");
const { mysqlPool } = require("./db_mysql");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserSequelize.findOne({ where: { googleId: profile.id } }) ||
                   await new Promise((resolve) => {
                     mysqlPool.query("SELECT * FROM users WHERE googleId = ?", [profile.id], (err, results) => {
                       if (err || results.length === 0) return resolve(null);
                       resolve(results[0]);
                     });
                   }) ||
                   await UserMongo.findOne({ googleId: profile.id });

        if (!user) {
          user = await UserSequelize.create({ googleId: profile.id, email: profile.emails[0].value, name: profile.displayName });
          mysqlPool.query("INSERT INTO users (googleId, email, name) VALUES (?, ?, ?)", [profile.id, profile.emails[0].value, profile.displayName]);
          user = await new UserMongo({ googleId: profile.id, email: profile.emails[0].value, name: profile.displayName }).save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

/// controllers

//controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const UserSequelize = require("../models/mysql/User");
const RefreshTokenSequelize = require("../models/mysql/RefreshTokenSchema");
const { mysqlPool } = require("../config/db_mysql");
const UserMongo = require("../models/mongo/User");
const RefreshTokenMongo = require("../models/mongo/RefreshToken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { sendVerificationEmail } = require("../utils/emailService");


// Generate Access Token (Short-lived)
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // Token expires in 15 minutes
  );
};

// Generate Refresh Token (Long-lived)
const generateRefreshToken = async (user, dbType) => {
  const token = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  if (dbType === "sequelize") {
    await RefreshTokenSequelize.create({ token, userId: user.id, expiryDate });
  } else if (dbType === "mongo") {
    await new RefreshTokenMongo({ token, userId: user.id, expiryDate }).save();
  } else if (dbType === "raw") {
    mysqlPool.query(`INSERT INTO refresh_tokens (token, userId, expiryDate) VALUES (?, ?, ?)`,
      [token, user.id, expiryDate], (err) => {
        if (err) console.error("MySQL Refresh Token Error:", err);
      });
  }
  return token;
};

// Signup - Sequelize ORM
exports.signupSequelize = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserSequelize.create({ name, email, password: hashedPassword });
  
      // Generate Email Verification Token
      const verifyToken = jwt.sign({ id: newUser.id }, process.env.VERIFY_SECRET, { expiresIn: "1d" });
  
      // Send verification email
      await sendVerificationEmail(email, verifyToken);
  
      res.status(201).json({ message: "User registered! Please verify your email.", user: newUser });
    } catch (error) {
      res.status(500).json({ error: "Signup failed", details: error });
    }
  };
// Signup - Raw MySQL Query
exports.signupRawMySQL = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      mysqlPool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], async (err, results) => {
        if (err) return res.status(500).json({ error: "Signup failed", details: err });
  
        const userId = results.insertId;
        const verifyToken = jwt.sign({ id: userId }, process.env.VERIFY_SECRET, { expiresIn: "1d" });
  
        await sendVerificationEmail(email, verifyToken);
  
        res.status(201).json({ message: "User registered! Please verify your email." });
      });
    } catch (error) {
      res.status(500).json({ error: "Signup failed", details: error });
    }
  };

// Signup - MongoDB
exports.signupMongo = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserMongo({ name, email, password: hashedPassword });
  
      await newUser.save();
  
      const verifyToken = jwt.sign({ id: newUser._id }, process.env.VERIFY_SECRET, { expiresIn: "1d" });
  
      await sendVerificationEmail(email, verifyToken);
  
      res.status(201).json({ message: "User registered! Please verify your email." });
    } catch (error) {
      res.status(500).json({ error: "Signup failed", details: error });
    }
  };

// Login (Common for all)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Try Sequelize, MySQL Raw, and MongoDB
    let user = await UserSequelize.findOne({ where: { email } }) ||
               await new Promise((resolve) => {
                 mysqlPool.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
                   if (err || results.length === 0) return resolve(null);
                   resolve(results[0]);
                 });
               }) ||
               await UserMongo.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user, user instanceof UserSequelize ? "sequelize" : user._id ? "mongo" : "raw");

    res.status(200).json({ message: "Login successful", accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error });
  }
};

// Refresh Token API
exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(403).json({ error: "Refresh token required" });

    let storedToken;
    storedToken = await RefreshTokenSequelize.findOne({ where: { token } }) ||
                  await new Promise((resolve) => {
                    mysqlPool.query("SELECT * FROM refresh_tokens WHERE token = ?", [token], (err, results) => {
                      if (err || results.length === 0) return resolve(null);
                      resolve(results[0]);
                    });
                  }) ||
                  await RefreshTokenMongo.findOne({ token });

    if (!storedToken) return res.status(403).json({ error: "Invalid refresh token" });

    jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid refresh token" });

      let user = await UserSequelize.findByPk(decoded.id) ||
                 await new Promise((resolve) => {
                   mysqlPool.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, results) => {
                     if (err || results.length === 0) return resolve(null);
                     resolve(results[0]);
                   });
                 }) ||
                 await UserMongo.findById(decoded.id);

      if (!user) return res.status(404).json({ error: "User not found" });

      const newAccessToken = generateAccessToken(user);
      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ error: "Refresh token failed", details: error });
  }
};
// Logout Function
exports.logout = async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ error: "Refresh Token is required" });
  
      // Delete from DB
      await RefreshTokenSequelize.destroy({ where: { token: refreshToken } });
      mysqlPool.query("DELETE FROM refresh_tokens WHERE token = ?", [refreshToken]);
      await RefreshTokenMongo.deleteOne({ token: refreshToken });
  
      res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Logout failed", details: error });
    }
  };

  // Setup Email Transporter (Use your SMTP details)
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  
  // Send Reset Password Email
  const sendResetPasswordEmail = async (email, resetToken) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click on this link to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };
  
    await transporter.sendMail(mailOptions);
  };

  exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      
      // Find user in Sequelize, Raw MySQL, and MongoDB
      let user = await UserSequelize.findOne({ where: { email } }) ||
                 await new Promise((resolve) => {
                   mysqlPool.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
                     if (err || results.length === 0) return resolve(null);
                     resolve(results[0]);
                   });
                 }) ||
                 await UserMongo.findOne({ email });
  
      if (!user) return res.status(404).json({ error: "User not found" });
  
      const resetToken = jwt.sign({ id: user.id }, process.env.RESET_SECRET, { expiresIn: "15m" });
  
      await sendResetPasswordEmail(email, resetToken);
  
      res.status(200).json({ message: "Password reset link sent!" });
    } catch (error) {
      res.status(500).json({ error: "Forgot password failed", details: error });
    }
  };

  exports.resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
  
      jwt.verify(token, process.env.RESET_SECRET, async (err, decoded) => {
        if (err) return res.status(400).json({ error: "Invalid or expired token" });
  
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        // Update Password in Sequelize, Raw MySQL, and MongoDB
        await UserSequelize.update({ password: hashedPassword }, { where: { id: decoded.id } });
        mysqlPool.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, decoded.id]);
        await UserMongo.findByIdAndUpdate(decoded.id, { password: hashedPassword });
  
        res.status(200).json({ message: "Password reset successful!" });
      });
    } catch (error) {
      res.status(500).json({ error: "Reset password failed", details: error });
    }
  };
  const sendVerificationEmail = async (email, verifyToken) => {
    const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Click on this link to verify your email: ${verifyLink}`,
      html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
    };
  
    await transporter.sendMail(mailOptions);
  };
    
  exports.verifyEmail = async (req, res) => {
    try {
      const { token } = req.body;
  
      jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
        if (err) return res.status(400).json({ error: "Invalid or expired token" });
  
        // Update Verification Status
        await UserSequelize.update({ isVerified: true }, { where: { id: decoded.id } });
        mysqlPool.query("UPDATE users SET isVerified = 1 WHERE id = ?", [decoded.id]);
        await UserMongo.findByIdAndUpdate(decoded.id, { isVerified: true });
  
        res.status(200).json({ message: "Email verified successfully!" });
      });
    } catch (error) {
      res.status(500).json({ error: "Email verification failed", details: error });
    }
  };

  //contorllers/userController.js
const UserSequelize = require("../models/mysql/User"); // Sequelize Model
const mysqlPool = require("../server"); // Raw MySQL Connection
const UserMongo = require("../models/mongo/User"); // MongoDB Model
const { Op } = require("sequelize");
const { uploadFirebase } = require("../middlewares/upload");


// **1️⃣ Create User**
exports.createUser = async (req, res) => {
  try {
    const { db, name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

    if (db === "sequelize") {
      const user = await UserSequelize.create({ name, email, password });
      return res.status(201).json(user);
    } 

    if (db === "raw") {
      const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      const [result] = await mysqlPool.promise().query(query, [name, email, password]);
      return res.status(201).json({ id: result.insertId, name, email });
    } 

    if (db === "mongo") {
      const user = await UserMongo.create({ name, email, password });
      return res.status(201).json(user);
    }

    res.status(400).json({ message: "Invalid database option" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// **2️⃣ Get All Users (Pagination & Filtering)**
exports.getAllUsers = async (req, res) => {
  try {
    const { db, page = 1, limit = 10, name, email } = req.query;
    const offset = (page - 1) * limit; 

    if (db === "sequelize") {
      const where = {};
      if (name) where.name = { [Op.like]: `%${name}%` };
      if (email) where.email = { [Op.like]: `%${email}%` };

      const { count, rows } = await UserSequelize.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return res.json({ total: count, page, totalPages: Math.ceil(count / limit), users: rows });
    } 
    
    if (db === "raw") {
      let query = "SELECT * FROM users WHERE 1=1";
      const params = [];

      if (name) { query += " AND name LIKE ?"; params.push(`%${name}%`); }
      if (email) { query += " AND email LIKE ?"; params.push(`%${email}%`); }
      query += " LIMIT ? OFFSET ?";
      params.push(parseInt(limit), parseInt(offset));

      const [users] = await mysqlPool.promise().query(query, params);

      return res.json({ total: users.length, page, totalPages: Math.ceil(users.length / limit), users });
    } 
    
    if (db === "mongo") {
      const filter = {};
      if (name) filter.name = new RegExp(name, "i");
      if (email) filter.email = new RegExp(email, "i");

      const users = await UserMongo.find(filter).skip(parseInt(offset)).limit(parseInt(limit));
      const total = await UserMongo.countDocuments(filter);

      return res.json({ total, page, totalPages: Math.ceil(total / limit), users });
    }

    res.status(400).json({ message: "Invalid database option" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// **3️⃣ Get User by ID**
exports.getUserById = async (req, res) => {
  try {
    const { db } = req.query;
    const { id } = req.params;

    if (db === "sequelize") {
      const user = await UserSequelize.findByPk(id);
      return user ? res.json(user) : res.status(404).json({ message: "User not found" });
    } 

    if (db === "raw") {
      const [user] = await mysqlPool.promise().query("SELECT * FROM users WHERE id = ?", [id]);
      return user.length ? res.json(user[0]) : res.status(404).json({ message: "User not found" });
    } 

    if (db === "mongo") {
      const user = await UserMongo.findById(id);
      return user ? res.json(user) : res.status(404).json({ message: "User not found" });
    }

    res.status(400).json({ message: "Invalid database option" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// **4️⃣ Update User**
exports.updateUser = async (req, res) => {
  try {
    const { db } = req.query;
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (db === "sequelize") {
      const user = await UserSequelize.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      await user.update({ name, email, password });
      return res.json(user);
    } 

    if (db === "raw") {
      const [result] = await mysqlPool.promise().query(
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
        [name, email, password, id]
      );
      return result.affectedRows ? res.json({ id, name, email }) : res.status(404).json({ message: "User not found" });
    } 

    if (db === "mongo") {
      const user = await UserMongo.findByIdAndUpdate(id, { name, email, password }, { new: true });
      return user ? res.json(user) : res.status(404).json({ message: "User not found" });
    }

    res.status(400).json({ message: "Invalid database option" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// **5️⃣ Delete User**
exports.deleteUser = async (req, res) => {
  try {
    const { db } = req.query;
    const { id } = req.params;

    if (db === "sequelize") {
      const user = await UserSequelize.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      await user.destroy();
      return res.json({ message: "User deleted successfully" });
    } 

    if (db === "raw") {
      const [result] = await mysqlPool.promise().query("DELETE FROM users WHERE id = ?", [id]);
      return result.affectedRows ? res.json({ message: "User deleted" }) : res.status(404).json({ message: "User not found" });
    } 

    if (db === "mongo") {
      const user = await UserMongo.findByIdAndDelete(id);
      return user ? res.json({ message: "User deleted" }) : res.status(404).json({ message: "User not found" });
    }

    res.status(400).json({ message: "Invalid database option" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Upload Profile Picture - Sequelize ORM
exports.uploadProfileSequelize = async (req, res) => {
  try {
    const user = await UserSequelize.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.profileImage = req.file.path;
    await user.save();

    res.json({ message: "Profile picture updated", user });
  } catch (error) {
    res.status(500).json({ error: "Upload failed", details: error });
  }
};

// Upload Profile Picture - Raw MySQL
exports.uploadProfileRawMySQL = async (req, res) => {
  try {
    const query = `UPDATE users SET profileImage = ? WHERE id = ?`;
    mysqlPool.query(query, [req.file.path, req.user.id], (err) => {
      if (err) return res.status(500).json({ error: "Upload failed", details: err });
      res.json({ message: "Profile picture updated" });
    });
  } catch (error) {
    res.status(500).json({ error: "Upload failed", details: error });
  }
};

// Upload Profile Picture - MongoDB
exports.uploadProfileMongo = async (req, res) => {
  try {
    const user = await UserMongo.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.profileImage = req.file.path;
    await user.save();

    res.json({ message: "Profile picture updated", user });
  } catch (error) {
    res.status(500).json({ error: "Upload failed", details: error });
  }
};

///controllers/chatController.js
const MessageSequelize = require("../models/mysql/Message");
const { mysqlPool } = require("../config/db_mysql");
const MessageMongo = require("../models/mongo/Message");

exports.getChatHistory = async (req, res) => {
  try {
    const { dbType } = req.query;

    let messages;
    if (dbType === "sequelize") {
      messages = await MessageSequelize.findAll();
    } else if (dbType === "raw") {
      messages = await new Promise((resolve) => {
        mysqlPool.query("SELECT * FROM messages", (err, results) => {
          if (err) return resolve([]);
          resolve(results);
        });
      });
    } else if (dbType === "mongo") {
      messages = await MessageMongo.find();
    } else {
      return res.status(400).json({ error: "Invalid dbType" });
    }

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to get chat history", details: error });
  }
};


/// middleware
//middleware/authMiddleware
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT Token
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware for Role-Based Access
exports.authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Access denied. Insufficient permissions." });
  }
  next();
};

//middleware/upload.js
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const s3 = require("../config/aws");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
// Local storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});


const s3Storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
  });

  const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads",
      format: async (req, file) => "png",
      public_id: (req, file) => Date.now().toString(),
    },
  });

  const uploadFirebase = async (file) => {
    return new Promise((resolve, reject) => {
      const fileName = Date.now() + path.extname(file.originalname);
      const fileUpload = bucket.file(fileName);
  
      const stream = fileUpload.createWriteStream({
        metadata: { contentType: file.mimetype },
      });
  
      stream.on("error", (error) => reject(error));
      stream.on("finish", async () => {
        await fileUpload.makePublic();
        resolve(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
      });
  
      stream.end(file.buffer);
    });
  };
  
const upload = multer({ storage });
const uploadS3 = multer({ storage: s3Storage });
const uploadCloudinary = multer({ storage: cloudinaryStorage });


module.exports = { upload, uploadS3 , uploadCloudinary, uploadFirebase};

///models
//models/mongo/RefreshToken.js
const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiryDate: { type: Date, required: true },
});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
module.exports = RefreshToken;

//models/mongo/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "superadmin"], default: "user" },
  verified: { type: Boolean, default: false },
  profileImage: { type: String },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;

//models/mysql/rawqueries.js
const { mysqlPool } = require("../../config/db_mysql");

// Create User
const createUser = async (name, email, password) => {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  return mysqlPool.promise().execute(query, [name, email, password]);
};

// Get All Users
const getAllUsers = async () => {
  const query = "SELECT * FROM users";
  const [rows] = await mysqlPool.promise().query(query);
  return rows;
};

// Get User by ID
const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = ?";
  const [rows] = await mysqlPool.promise().query(query, [id]);
  return rows[0];
};

module.exports = { createUser, getAllUsers, getUserById };

//models/mysql/REfrshtoken.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db_mysql");

const RefreshTokenSchema = sequelize.define("RefreshToken", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  token: { type: DataTypes.STRING, allowNull: false, unique: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  expiryDate: { type: DataTypes.DATE, allowNull: false },
});

module.exports = RefreshTokenSchema;

//model/smysql//User.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db_mysql");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("user", "admin", "superadmin"), defaultValue: "user" },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  profileImage: { type: DataTypes.STRING, allowNull: true }, // Store file path

});

module.exports = User;

//  models/mysql/Message.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db_mysql");

const Message = sequelize.define("Message", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  sender: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = Message;

//models/mongo/Message.js

const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: String,
  message: String,
}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;


///routes
//routes/authRoutes.js
const express = require("express");
const {
  signupSequelize, signupRawMySQL, signupMongo, login, 
  refreshToken, logout, forgotPassword, resetPassword, 
  verifyEmail, googleAuthRedirect
} = require("../controllers/authController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");
const passport = require("passport");

const router = express.Router();

// 🟢 Signup Routes
router.post("/signup/sequelize", signupSequelize);
router.post("/signup/mysql", signupRawMySQL);
router.post("/signup/mongo", signupMongo);

// 🟢 Login & Token Routes
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

// 🔐 Role-Based Access Example
router.get("/admin-only", protect, restrictTo("admin"), (req, res) => {
  res.json({ message: "Admin access granted!" });
});

// 🔄 Forgot & Reset Password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// 📩 Email Verification
router.get("/verify-email/:token", verifyEmail);

// 🔵 Google Authentication
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), googleAuthRedirect);

router.get("/verify-email", async (req, res) => {
    try {
      const { token } = req.query;
      if (!token) return res.status(400).json({ error: "Invalid token" });
  
      jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
        if (err) return res.status(400).json({ error: "Invalid or expired token" });
  
        const { id } = decoded;
  
        // Update user verification status in the database
        await UserSequelize.update({ verified: true }, { where: { id } }) ||
        mysqlPool.query("UPDATE users SET verified = 1 WHERE id = ?", [id]) ||
        await UserMongo.findByIdAndUpdate(id, { verified: true });
  
        res.status(200).json({ message: "Email verified successfully!" });
      });
    } catch (error) {
      res.status(500).json({ error: "Verification failed", details: error });
    }
  });
  

module.exports = router;

//routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { upload, uploadS3, uploadCloudinary } = require("../middlewares/upload");
const { uploadProfileSequelize, uploadProfileRawMySQL, uploadProfileMongo } = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");
// CRUD Routes for Users
router.post("/", userController.createUser); // Create User
router.get("/", userController.getAllUsers); // Get All Users with Pagination & Filtering
router.get("/:id", userController.getUserById); // Get User by ID
router.put("/:id", userController.updateUser); // Update User
router.delete("/:id", userController.deleteUser); // Delete User

router.post("/upload/sequelize", authMiddleware, upload.single("file"), uploadProfileSequelize);
router.post("/upload/mysql", authMiddleware, upload.single("file"), uploadProfileRawMySQL);
router.post("/upload/mongo", authMiddleware, upload.single("file"), uploadProfileMongo);

module.exports = router;

///routes/chatRoutes.js
const express = require("express");
const { getChatHistory } = require("../controllers/chatController");

const router = express.Router();

router.get("/history", getChatHistory);

module.exports = router;


///utils/emailservices.js

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

exports.sendVerificationEmail = async (email, token) => {
  const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

///server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session");
const { sequelize } = require("./config/db_mysql");
const connectMongoDB = require("./config/db_mongo"); // ✅ Add MongoDB connection
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
require("./config/passport_google");
require("./config/googleAuth"); // Load Google OAuth strategy

const RefreshTokenSequelize = require("./models/mysql/RefreshTokenchema");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// ✅ Connect to MongoDB
connectMongoDB();

const createUsersTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin', 'superadmin') DEFAULT 'user',
        verified BOOLEAN DEFAULT FALSE,
        profileImage VARCHAR(255) DEFAULT NULL
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`;

    try {
        await mysqlPool.promise().query(query);
        console.log("✅ Users table checked/created in MySQL");
    } catch (error) {
        console.error("❌ Error creating users table:", error);
    }
};

const createRefreshTokensTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS refresh_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        token VARCHAR(255) NOT NULL UNIQUE,
        userId INT NOT NULL,
        expiryDate DATETIME NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )`;

    try {
        await mysqlPool.promise().query(query);
        console.log("✅ RefreshTokens table checked/created in MySQL");
    } catch (error) {
        console.error("❌ Error creating refresh_tokens table:", error);
    }
};

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender VARCHAR(255) NOT NULL,
  message TEXT NOT NULL
);


// Run table creation when the project starts
createUsersTable();
createRefreshTokensTable();

//**update servre.js for chat communication
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins (for testing)
  },
});

app.use(cors());
app.use(express.json());

// WebSocket Connection Handling
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("sendMessage", (messageData) => {
    console.log("Received message:", messageData);

    // Broadcast message to all clients
    io.emit("receiveMessage", messageData);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//////////
const MessageSequelize = require("./models/mysql/Message");
const { mysqlPool } = require("./config/db_mysql");
const MessageMongo = require("./models/mongo/Message");

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("sendMessage", async (messageData) => {
    console.log("Received message:", messageData);
    
    const { sender, message, dbType } = messageData;

    if (dbType === "sequelize") {
      await MessageSequelize.create({ sender, message });
    } else if (dbType === "raw") {
      mysqlPool.query(`INSERT INTO messages (sender, message) VALUES (?, ?)`, [sender, message], (err) => {
        if (err) console.error("MySQL Insert Error:", err);
      });
    } else if (dbType === "mongo") {
      await new MessageMongo({ sender, message }).save();
    }

    io.emit("receiveMessage", messageData);
  });
  const chatRoutes = require("./routes/chatRoutes");
app.use("/chat", chatRoutes);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    
    try {
        await sequelize.sync(); // ✅ Improved error handling
        console.log("✅ MySQL (Sequelize) Database Synced");
    } catch (error) {
        console.error("❌ MySQL Sync Error:", error);
    }
});

////////////npm install socket.io socket.io-client



///////////Client Side Implementation (React.js Example)
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = (dbType) => {
    const messageData = { sender: "User1", message: inputMessage, dbType };
    socket.emit("sendMessage", messageData);
    setInputMessage("");
  };

  return (
    <div>
      <h2>Real-Time Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}><b>{msg.sender}:</b> {msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={() => sendMessage("sequelize")}>Send (Sequelize)</button>
      <button onClick={() => sendMessage("raw")}>Send (Raw MySQL)</button>
      <button onClick={() => sendMessage("mongo")}>Send (MongoDB)</button>
    </div>
  );
};

export default ChatApp;


