const userService = require('../services/userService');

const createUser = async (req, res) => {
    const { first_name, last_name, email, mobile, birthdate, addresses } = req.body;

    if (!first_name || !last_name || !email || !mobile || !addresses || addresses.length === 0) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    const userData = { first_name, last_name, email, mobile, birthdate, addresses };

    try {
        const response = await userService.createUser(userData);
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const searchUsers = async (req, res) => {
    const filters = req.query;

    try {
        const users = await userService.searchUsers(filters);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createUser,
    searchUsers,
    getAllUsers
};
