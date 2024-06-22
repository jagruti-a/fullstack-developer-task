const validateUser = (req, res, next) => {
    const { first_name, last_name, email, mobile, addresses } = req.body;

    if (!first_name || !last_name || !email || !mobile) {
        return res.status(400).json({ message: 'First name, last name, email, and mobile are mandatory' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!/^\d{10}$/.test(mobile)) {
        return res.status(400).json({ message: 'Mobile number should be a 10 digit number' });
    }

    if (!addresses || addresses.length === 0) {
        return res.status(400).json({ message: 'At least one address is mandatory' });
    }

    for (const address of addresses) {
        if (!address.address_line1 || !address.pincode || !address.city || !address.state || !address.type) {
            return res.status(400).json({ message: 'Address line1, pincode, city, state, and type are mandatory in addresses' });
        }

        if (!/^\d{4,6}$/.test(address.pincode)) {
            return res.status(400).json({ message: 'Pincode should be between 4 and 6 digits' });
        }

        if (!['Home', 'Office'].includes(address.type)) {
            return res.status(400).json({ message: 'Address type should be either Home or Office' });
        }
    }

    next();
};

module.exports = {
    validateUser
};
