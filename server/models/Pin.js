const mongoose = require('mongoose')

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    lati: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model(PinSchema)