process.env.NODE_ENV = "dev";
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./router')
const mongoose = require('mongoose')
const config = require('config')

const url = config.get("dbConfig.url");
const mongoConfig = {
    useCreateIndex: true,
    useNewUrlParser: true
}
mongoose.connect(url, mongoConfig);

const app = express()
// app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}))
router(app)

const port = process.env.PORT || 3010
const server = http.createServer(app)
server.listen(port, function () {
    console.log("Server listening on ", port)
})