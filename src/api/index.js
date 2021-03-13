import axios from 'axios'

export const outService = axios.create({
  baseURL: `http://localhost:3001`,
  withCredentials: true
})

export const getWidgetState = (token, socketId) =>
  outService.get(`v1/widget/${token}/${socketId}`)