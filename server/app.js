require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors({origin: "*"}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/user", require("./routes/UserRoute"))

app.use((req, res) => res.status(404).send({error: "Not found requested route"}))

const httpServer = require("http").Server(app)

module.exports = httpServer