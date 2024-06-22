const User = require('../models/userModel');
const { pool } = require('../config/database');

const createUser = async (userData) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
        const { first_name, last_name, email, mobile, birthdate, addresses } = userData;
        const userResult = await User.create(connection, { first_name, last_name, email, mobile, birthdate });

        const userId = userResult.insertId;
        for (const address of addresses) {
            await User.createAddress(connection, { user_id: userId, ...address });
        }

        await connection.commit();
        return { id: userId, ...userData };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const getAllUsers = async () => {
    return User.findAll();
};

const searchUsers = async (filters) => {
    return User.search(filters);
};

module.exports = {
    createUser,
    getAllUsers,
    searchUsers
};
