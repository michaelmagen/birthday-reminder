const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

require('express-async-errors')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// install routes

// install error handeling middleware

module.exports = app
