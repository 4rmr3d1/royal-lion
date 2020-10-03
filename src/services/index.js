import axios from 'axios'
import { authHeader } from '@app/store'

const api = axios.create({
  baseURL: 'http://45.67.58.94'
})

export const royalApi = {
  getDepartments () {
    return api.get('/support/department/', { headers: authHeader() })
  }
}
