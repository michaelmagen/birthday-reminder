require('dotenv').config()

const PORT = process.env.PORT

const DB_CONNECTSTRING = process.env.CONNECTSTRING

const SUPABASE_URL = process.env.SUPABASE_URL

const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY

module.exports = {
  PORT,
  DB_CONNECTSTRING,
  SUPABASE_URL,
  SUPABASE_SECRET_KEY,
}
