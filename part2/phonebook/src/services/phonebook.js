import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newEntry => {
  return axios.post(baseUrl, newEntry)
}

export default {
  getAll: getAll,
  create: create
}