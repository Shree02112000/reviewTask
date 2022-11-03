const User = require('../Models/userModel');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');


const register = async(req, res) => {
    try {
        let { emailId } = req.body;
        const userExist = await User.findOne({ emailId: emailId })
        if (userExist) {
            return res.status(200).json({ message: "User details already exists" })
        } else {
            const hashedPass = await bcrypt.hash(req.body.password, 10)
            let user = new User({
                userName: req.body.userName,
                emailId: req.body.emailId,
                phoneNumber: req.body.phoneNumber, 
                password: hashedPass,
                
            })
            const savedUser = await user.save()
            res.status(200).json({ message: "User registered successfully", data: savedUser })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ errorMessage: error.message || error })
    }
}

const login = async(req, res) => {
    try {
        let emailId = req.body.emailId;
        let password = req.body.password;
        const user = await User.findOne({ emailId: emailId })

        if (user) {
            const result = await bcrypt.compare(password, user.password)

            if (result) {
                let token = jwt.sign({ userName: user.userName, emailId: user.emailId }, 'verySecretValue', { expiresIn: '10min' })
                const data = { name: user.userName, email: user.emailId, token: token }

                res.status(200).json({ message: "Logged-in successfully", data: data })
            } else {
                res.json({ errorMessage: "incorrect Password!!" })
            }
        } else {
            res.json({ errorMessage: "User not found!!" })
        }
    } catch (error) {
        return res.status(400).json({ errorMessage: error.message || error })
    }
}




module.exports = { register, login}