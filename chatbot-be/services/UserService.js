const user = require("../models/User");

exports.createUser = async(req, res) => {
    try {
        const newUser = new user(req.body);
        await newUser.save();
        res.status(200).json({ message: 'User stored successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to stored user' });
    }
};

exports.login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const users = await user.findOne({email: email});
        if(users.password===password)
        {
             res.status(200).json(users);
        } else {
            res.status(200).json({ message: 'Failed to Login' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}


exports.getUsers = async(req, res) => {
    try {
        const allUsers = await user.find();
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};