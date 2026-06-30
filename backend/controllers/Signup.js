const UserModel = require("../models/User");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')

const signup = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await UserModel.findOne({ email });
        
        if (user) {
            return res.status(409).json({ message: 'user already exist,go for login', success: false })
        }
        let userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ message: 'signup successfully', success: true });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Internal server error',error, success: false })
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await UserModel.findOne({ email });
        if (!user) {
           return res.status(403).json({ message: 'Email or Password is wrong', success: false })
        }
        let checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(403).json({ message: 'Email or Password is wrong', success: false })
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({ message: 'login successfully', success: true, jwtToken, name: user.name, email })

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false })
    }
}

module.exports = { signup, login };