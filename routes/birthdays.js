// api routes for birthday entries
const express = require('express')
const router = express.Router()
const supabase = require('../utils/db')

// insert new birthday to database
router.post('/', async (req, res) => {
  const { name, month, day } = req.body
  const user_id = req.user.data.user.id

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

  res.json(data[0])
})

// TODO: TEST THESE ROUTES

router.get('/', async (req, res) => {
  const user_id = req.user.data.user.id

  const { data, error } = await supabase
    .from('birthdays')
    .select()
    .eq('user_id', user_id)

  if (error) {
    console.log(error)
    return res.status(400).json(error).end()
  }
  console.log('getting all data of user')
  // if no users return an empty array
  res.json(data).end()
})
// get birthdays on month/day from specific user
router.get('/:month/:day', async (req, res) => {
  // ensure that month and date are nums and in proper range
  const month = parseInt(req.params.month)
  const day = parseInt(req.params.day)
  console.log('the month and day are', month, day)

  // if month or day are not an int or invalid number
  if (
    month > 12 ||
    month < 1 ||
    !Number.isInteger(month) ||
    day < 1 ||
    day > 31 ||
    !Number.isInteger(day)
  ) {
    return res
      .status(400)
      .json({
        error: 'Month and day must be integer that represent a real date',
      })
      .end()
  }
  const user_id = req.user.data.user.id

  // get the users from the database
  const { data, error } = await supabase
    .from('birthdays')
    .select()
    .eq('user_id', user_id)
    .eq('month', month)
    .eq('day', day)

  console.log(data)

  // if error, return an error
  if (error) {
    console.log(error)
    return res.status(400).json(error).end()
  }

  // if no users return an empty array
  res.json(data).end()
})

// delete birthday with specifig id
router.delete('/:id', async (req, res) => {
  // delete item from database
  const { error } = await supabase
    .from('birthdays')
    .delete()
    .eq('id', req.params.id)
  // if unable to find item or unable to delete, return an error
  if (error) {
    return res.status(400).json({ error: 'Unable to delete birthday' }).end()
  }

  res.status(204).end()
})

module.exports = router
