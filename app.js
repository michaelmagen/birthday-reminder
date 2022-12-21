const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const birhtdayRouter = require('./routes/birthdays')
const cookieParser = require('cookie-parser')

require('express-async-errors')
app.use(cookieParser())
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// install routes
app.use('/api/birthday', birhtdayRouter)
// install error handeling middleware

module.exports = app
