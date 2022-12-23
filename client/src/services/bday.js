// services for creating birthdays through api connection
import axios from 'axios'
const baseUrl = '/api/birthday'

const addBirthday = async (values) => {
  const response = await axios.post(baseUrl, values, { withCredentials: true })

  return response.data
}

const removeBirthday = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    withCredentials: true,
  })
  return response.data
}

const birthdayService = {
  addBirthday,
  removeBirthday,
}

export default birthdayService
