const express = require("express")
const connectDB = require("./db")

const server = express()
server.use(express.json())

// connect to database
connectDB()

// server.use('/', (req, res) => {
//     res.send("hellow o")
// })
server.use('/api/user', require("./routes/user"))
server.use('/api/pins', require("./routes/pin"))

server.listen(3500, () => {
    console.log("\x1b[42m%s\x1b[0m", "Server is listening on port 3500")
})
