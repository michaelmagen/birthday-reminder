// services for creating birthdays through api connection
import axios from 'axios'
const baseUrl = '/api/birthday'

const addBirthday = async (values) => {
  const response = axios.post(baseUrl, values, { withCredentials: true })
  return response.data
}

const birthdayService = {
  addBirthday,
}

export default birthdayService
