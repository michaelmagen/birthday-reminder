const supabase = require('./db')

// ensure request is authorized and retrieve user that made request
const authorizeRequest = async (req, res, next) => {
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

  if (user_data.error) {
    console.log('error getting the user')
    return res.status(400).json(user_data.error).end()
  }

  req['user'] = user_data

  next()
}

module.exports = {
  authorizeRequest,
}
