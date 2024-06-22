const { pool } = require('../config/database');

const User = {
    create: async (connection, userData) => {
        const { first_name, last_name, email, mobile, birthdate } = userData;
        const query = 'INSERT INTO users (first_name, last_name, email, mobile, birthdate) VALUES (?, ?, ?, ?, ?)';
        const [result] = await connection.query(query, [first_name, last_name, email, mobile, birthdate]);
        return result;
    },

    createAddress: async (connection, addressData) => {
        const { user_id, address_line1, address_line2, pincode, city, state, type } = addressData;
        const query = 'INSERT INTO addresses (user_id, address_line1, address_line2, pincode, city, state, type) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await connection.query(query, [user_id, address_line1, address_line2, pincode, city, state, type]);
        return result;
    },

    findAll: async () => {
        const query = `
            SELECT u.*, a.id as address_id, a.address_line1, a.address_line2, a.pincode, a.city, a.state, a.type
            FROM users u
            LEFT JOIN addresses a ON u.id = a.user_id
        `;
        const [results] = await pool.query(query);
        
        const usersMap = new Map();

        results.forEach(row => {
            const {
                id, first_name, last_name, email, mobile, birthdate,
                address_id, address_line1, address_line2, pincode, city, state, type
            } = row;

            if (!usersMap.has(id)) {
                usersMap.set(id, {
                    id,
                    first_name,
                    last_name,
                    email,
                    mobile,
                    birthdate,
                    addresses: []
                });
            }

            if (address_id) {
                usersMap.get(id).addresses.push({
                    address_id,
                    address_line1,
                    address_line2,
                    pincode,
                    city,
                    state,
                    type
                });
            }
        });

        return Array.from(usersMap.values());
    },

    search: async (filters) => {
        const { searchString, age, city } = filters;
        let query = `
            SELECT u.*, a.id as address_id, a.address_line1, a.address_line2, a.pincode, a.city, a.state, a.type 
            FROM users u
            LEFT JOIN addresses a ON u.id = a.user_id
            WHERE 1=1
        `;
        const queryParams = [];

        if (searchString) {
            query += ` AND (LOWER(u.first_name) LIKE LOWER(?) OR LOWER(u.last_name) LIKE LOWER(?) OR LOWER(u.email) LIKE LOWER(?))`;
            const searchPattern = `%${searchString}%`;
            queryParams.push(searchPattern, searchPattern, searchPattern);
        }

        if (age) {
            const ageCondition = age.includes('<=') ? 'u.birthdate >= DATE_SUB(CURDATE(), INTERVAL ? YEAR)' : 'u.birthdate <= DATE_SUB(CURDATE(), INTERVAL ? YEAR)';
            query += ` AND ${ageCondition}`;
            const ageValue = age.replace('<=', '').replace('>=', '');
            queryParams.push(ageValue);
        }

        if (city) {
            query += ` AND LOWER(a.city) = LOWER(?)`;
            queryParams.push(city);
        }

        const [results] = await pool.query(query, queryParams);

        const usersMap = new Map();

        results.forEach(row => {
            const {
                id, first_name, last_name, email, mobile, birthdate,
                address_id, address_line1, address_line2, pincode, city, state, type
            } = row;

            if (!usersMap.has(id)) {
                usersMap.set(id, {
                    id,
                    first_name,
                    last_name,
                    email,
                    mobile,
                    birthdate,
                    addresses: []
                });
            }

            if (address_id) {
                usersMap.get(id).addresses.push({
                    address_id,
                    address_line1,
                    address_line2,
                    pincode,
                    city,
                    state,
                    type
                });
            }
        });

        return Array.from(usersMap.values());
    }
};

module.exports = User;
