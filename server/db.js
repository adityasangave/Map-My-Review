const env = require("dotenv")
const mongoose = require("mongoose")

env.config()
mongoose.set("strictQuery", false);

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => {
            console.log("\x1b[42m%s\x1b[0m", "Database is connected")
        }).catch((error) => {
            console.log(error)
        })
}

module.exports = connectDB