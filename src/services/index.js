import axios from 'axios'
import { authHeader } from '@app/store'

const api = axios.create({
  baseURL: 'https://api.royal-lion.bet'
})

export const royalApi = {
  getDepartments () {
    return api.get('/support/department/', { headers: authHeader() })
  }
}
