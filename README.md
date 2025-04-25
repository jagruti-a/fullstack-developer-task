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



///mysql nodejs

mkdir blog-api-mysql
cd blog-api-mysql
npm init -y
npm install express mysql2 bcrypt jsonwebtoken dotenv

blog-api-mysql/
├── controllers/
│   ├── authController.js
│   ├── blogController.js
├── routes/
│   ├── authRoutes.js
│   ├── blogRoutes.js
├── middleware/
│   ├── auth.js
│   ├── role.js
├── db.js
├── app.js
├── server.js
├── .env

//.env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=blog_db
JWT_SECRET=your_jwt_secret

//initDb.js
const db = require('./db');

const initDb = () => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      role VARCHAR(20) DEFAULT 'user'
    )`;

  const blogTable = `
    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      content TEXT,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`;

  db.query(userTable, (err) => {
    if (err) console.error("Error creating users table:", err);
    else console.log("Users table ready");
  });

  db.query(blogTable, (err) => {
    if (err) console.error("Error creating blogs table:", err);
    else console.log("Blogs table ready");
  });
};

module.exports = initDb;


//db.js
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

module.exports = db;

//authController.js
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hash],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'User registered!' });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

//blogController.js
const db = require('../db');

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  db.query('INSERT INTO blogs (title, content, user_id) VALUES (?, ?, ?)',
    [title, content, userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Post created' });
    });
};

exports.getPosts = (req, res) => {
  const { page = 1, limit = 5 } = req.query;  // Default to page 1, limit 5

  // Convert page and limit to integers
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  // Calculate the offset based on page and limit
  const offset = (pageNum - 1) * limitNum;

  // Query to get paginated posts
  db.query(
    'SELECT blogs.*, users.name FROM blogs JOIN users ON blogs.user_id = users.id LIMIT ? OFFSET ?',
    [limitNum, offset],
    (err, results) => {
      if (err) return res.status(500).json(err);

      // Query to count total number of posts (for pagination metadata)
      db.query('SELECT COUNT(*) AS totalPosts FROM blogs', (err, countResults) => {
        if (err) return res.status(500).json(err);

        const totalPosts = countResults[0].totalPosts;
        const totalPages = Math.ceil(totalPosts / limitNum);

        res.json({
          currentPage: pageNum,
          totalPages,
          totalPosts,
          posts: results
        });
      });
    }
  );
};


exports.updatePost = (req, res) => {
  const { title, content } = req.body;
  const postId = req.params.id;
  const userId = req.user.id;

  db.query(
    'UPDATE blogs SET title = ?, content = ? WHERE id = ? AND user_id = ?',
    [title, content, postId, userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(403).json({ message: 'Not allowed' });
      res.json({ message: 'Post updated' });
    }
  );
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  db.query('DELETE FROM blogs WHERE id = ? AND user_id = ?', [postId, userId], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(403).json({ message: 'Not allowed' });
    res.json({ message: 'Post deleted' });
  });
};

// auth.js (JWT Middleware)
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

//role.js (Role Middleware)
module.exports = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: 'Access denied' });
    next();
  };
};

// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;

// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/blogController');

// Get paginated blog posts
router.get('/', auth, getPosts);

// Other routes (create, update, delete)
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;


//app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

module.exports = app;

//server.js
require('dotenv').config();
const app = require('./app');
const initDb = require('./initDb');

initDb(); // Call DB initializer

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


////sequilize project

blog-app/
│
├── config/
│   └── db.js               // Sequelize setup
├── controllers/
│   ├── authController.js
│   └── blogController.js
├── middleware/
│   ├── auth.js            // JWT validation
│   └── role.js            // Role check middleware
├── models/
│   ├── index.js
│   ├── user.js
│   └── blog.js
├── routes/
│   ├── authRoutes.js
│   └── blogRoutes.js
├── .env
├── server.js
├── package.json
└── README.md


npm install express mysql2 sequelize dotenv bcryptjs jsonwebtoken bcryptjs
npm install --save-dev nodemon

mkdir config controllers middleware models routes
touch server.js .env

//.env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blogdb
JWT_SECRET=your_jwt_secret

//config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;

//models/index.js
const sequelize = require('../config/db');
const User = require('./user');
const Blog = require('./blog');

// Define associations
User.hasMany(Blog, { foreignKey: 'user_id' });
Blog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { sequelize, User, Blog };

//models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  }
});

module.exports = User;

// models/blog.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

module.exports = Blog;

//server.js
const express = require('express');
require('dotenv').config();
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');


const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Blog API running...');
});


// Sync DB and start server
sequelize.sync({ force: false }).then(() => {
  console.log("DB connected and synced!");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error("DB connection failed:", err);
});

//controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

//middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains user id and role
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = auth;

//routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;

//controllers/blogController.js
const { Blog, User } = require('../models');

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({ title, content, user_id: req.user.id });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    const blogs = await Blog.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      totalPosts: blogs.count,
      totalPages: Math.ceil(blogs.count / limit),
      currentPage: parseInt(page),
      blogs: blogs.rows
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: { id: req.params.id },
      include: [{ model: User, attributes: ['id', 'name'] }]
    });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching blog' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (req.user.role !== 'admin' && blog.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to update this blog' });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (req.user.role !== 'admin' && blog.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to delete this blog' });
    }

    await blog.destroy();
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};

//routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

router.post('/', auth, createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getSingleBlog);
router.put('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

module.exports = router;
