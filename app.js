const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const birhtdayRouter = require('./routes/birthdays')
const cookieParser = require('cookie-parser')
const middleware = require('./utils/middleware')
const twilioClient = require('./utils/twilioClient')
const cron = require('node-cron')
const config = require('./utils/config')
const sendReminders = require('./utils/cronJob')

// runs sendReminders every day at 8 am
cron.schedule('0 8 * * *', () => {
  sendReminders()
})

require('express-async-errors')
app.use(cookieParser())
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(middleware.authorizeRequest)
// install routes
app.use('/api/birthday', birhtdayRouter)
// install error handeling middleware

module.exports = app
