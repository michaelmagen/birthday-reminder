const Pool = require('pg').Pool
const config = require('./config')
const connectionString = config.CONNECTSTRING

const pool = new Pool({
  connectionString,
})

module.exports = pool
