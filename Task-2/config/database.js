const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_management',
});

const initDB = async () => {
    const connection = await pool.getConnection();
    try {
        await connection.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            mobile VARCHAR(10) NOT NULL UNIQUE,
            birthdate DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        await connection.query(`CREATE TABLE IF NOT EXISTS addresses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            address_line1 VARCHAR(255) NOT NULL,
            address_line2 VARCHAR(255),
            pincode VARCHAR(6) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            type ENUM('Home', 'Office') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`);
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        connection.release();
    }
};

module.exports = { pool, initDB };
