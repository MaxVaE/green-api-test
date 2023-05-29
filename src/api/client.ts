import axios from 'axios'

const baseURL = 'https://api.green-api.com'

const getClient = () => axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

export const client = getClient()

client.interceptors.response.use(
  (response) => response,
  (error) => error.message,
)
