const express = require("express")
const connectDB = require("./db")

const server = express()

// connect to database
connectDB()

server.listen(3500, () => {
    console.log("\x1b[42m%s\x1b[0m", "Server is listening")
})