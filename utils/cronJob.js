const config = require('./config')
const twilioClient = require('./twilioClient')
const supabase = require('./db')

// send a reminder text to user for every birthday happening today
const sendReminders = async () => {
  // get todays date
  const date = new Date()
  const currentMonth = date.getMonth() + 1
  const currentDay = date.getDate()

  // get all the bday reminders that occur today
  const birthdaysToday = await supabase
    .from('birthdays')
    .select()
    .eq('month', currentMonth)
    .eq('day', currentDay)

  // if no bdays today, return and do nothing
  if (birthdaysToday.data.length === 0) {
    console.log('there are none')
    return
  }
  // for every reminder, send a reminder to user that owns that bday reminder
  birthdaysToday.data.forEach(async (reminder) => {
    // get the user's phone number so we can send message to this number
    const user = await supabase.auth.admin.getUserById(reminder.user_id)
    const userPhoneNumber = `+1${user.data.user.user_metadata.phone}`
    console.log(userPhoneNumber)
    // send the text message through twilio client
    twilioClient.messages
      .create({
        body: `🎉 Today is ${reminder.name}'s birthday! Don't forget to send them a message!`,
        from: config.TWILIO_PHONE_NUMBER,
        to: userPhoneNumber,
      })
      .then((message) => console.log(message.sid))
  })
}

module.exports = sendReminders
