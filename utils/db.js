const config = require('./config')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SECRET_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

module.exports = supabase
