// api routes for birthday entries
const express = require('express')
const router = express.Router()
const supabase = require('../utils/db')

// insert new birthday to database
router.post('/', async (req, res) => {
  const { name, month, day } = req.body
  const refreshToken = req.cookies['my-refresh-token']
  const accessToken = req.cookies['my-access-token']

  // make sure the user is authorized
  if (refreshToken && accessToken) {
    await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    })
  } else {
    return res.status(400).json({ error: 'User is not authenticated' }).end()
  }

  // retrieve user id
  const user_data = await supabase.auth.getUser()

  // send error if unable to get user
  if (user_data.error) {
    console.log('error getting the user')
    return res.status(400).json(user_data.error).end()
  }
  const user_id = user_data.data.user.id

  // ensure birthday date exists. Feb has 29 days. Apr, Jun, Sept, and Nov have only 30.
  if (
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 9 ||
    month === 11
  ) {
    if ((day > 29 && month == 2) || day > 30) {
      return res
        .status(400)
        .json({ error: 'Invalid birthday, date does not exist' })
        .end()
    }
  }

  // add birthday to database
  const { data, error } = await supabase
    .from('birthdays')
    .insert({ name: name, month: month, day: day, user_id: user_id })
    .select()

  if (error) {
    console.log(error)
    return res.status(400).json(error).end()
  }

  console.log('request made', name, month, day, user_id)
  res.json(data)
})

module.exports = router
