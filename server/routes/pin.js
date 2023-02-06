const User = require("../models/User")
const router = require("express").Router()
const Pin = require("../models/Pin")

// creating a pin
router.post('/create-pin', async (req, res) => {
    const pinCandidate = new Pin(req.body)

    try {
        const pin = await pinCandidate.save()
        res.status(200).json(pin)
    }
    catch (err) {
        res.status(403).json({
            'Error': err
        })
    }
})

router.get('/get-all-pins', async (req, res) => {
    try {
        const pins = await Pin.find()
        res.status(200).json(pins)
    } catch (err) {
        res.status(403).json({
            'Error': err
        })
    }
})

module.exports = router