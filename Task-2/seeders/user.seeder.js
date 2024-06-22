const { pool } = require('../config/database');
const users = require('../users.json');

const seedDatabase = async () => {
    const connection = await pool.getConnection();
    try {
        console.log('Starting database seed...');

        for (const [index, user] of users.entries()) {
            console.log(`Seeding user ${index + 1} of ${users.length}`);
            const { first_name, last_name, email, mobile, birthdate, addresses } = user;

            const [userResult] = await connection.query(
                'INSERT INTO users (first_name, last_name, email, mobile, birthdate) VALUES (?, ?, ?, ?, ?)',
                [first_name, last_name, email, mobile, birthdate]
            );
            const userId = userResult.insertId;
            console.log(`Inserted user with ID: ${userId}`);

            for (const address of addresses) {
                const { address_line1, address_line2, pincode, city, state, type } = address;
                await connection.query(
                    'INSERT INTO addresses (user_id, address_line1, address_line2, pincode, city, state, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [userId, address_line1, address_line2, pincode, city, state, type]
                );
                console.log(`Inserted address for user ID: ${userId}`);
            }
        }

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        connection.release();
    }
};

seedDatabase();
