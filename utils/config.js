require('dotenv').config()

const PORT = process.env.PORT

const DB_CONNECTSTRING = process.env.CONNECTSTRING

module.exports = {
  PORT,
  DB_CONNECTSTRING,
}
