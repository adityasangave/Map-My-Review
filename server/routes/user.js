const User = require("../models/User")
const router = require("express").Router()
const bcrypt = require("bcryptjs")
//register user

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(400).json({
                'error': 'Email already exist'
            })
        }
        const usernameExist = await User.findOne({ username: username })
        if (usernameExist) {
            return res.status(400).json({
                'error': 'Username already exist'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const securePass = await bcrypt.hash(password, salt)

        const user = await User.create({
            username: username,
            email: email,
            password: securePass
        }).then(user => { res.json(user) })
    }
    catch (err) {
        res.status(403).json("Internal Server Error")
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(403).json({
                'error': 'Please Create an account'
            })
        }
        const passCompare = bcrypt.compare(password, user.password)
        if (!passCompare) {
            res.status(403).json({ 'error': 'Please Enter valid credentials' })
        }

        res.status(200).json(user)
    } catch (err) {
        res.status(403).json("Internal Server Error")
    }
})

module.exports = router