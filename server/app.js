const express = require('express');
const cors = require('cors')
const app = express()
const routes = require('./routes')

app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true
}));
app.use(express.json())

app.use("/api", routes)

module.exports = app

