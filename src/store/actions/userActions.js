import axios from 'axios'
const API_URL = 'http://45.67.58.94'

export function authHeader () {
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (user && user.key) {
    return { Authorization: `Token ${user.key}` }
  } else {
    return {}
  }
}

const login = ({ username, password }) => (dispatch) => {
  return axios
    .post(`${API_URL}/user/auth/login/`, { username, password })
    .then((response) => {
      dispatch({ type: '@USER/login-request', response })

      if (response.data.key) {
        window.localStorage.setItem('user', JSON.stringify(response.data))

        dispatch({ type: '@USER/login-success', isLoggedIn: true })
        dispatch({
          type: '@USER/change-property',
          payload: {
            authModalVisible: false
          }
        })
      }

      return response.data.key
    })
    .catch((error) => {
      dispatch({ type: '@USER/login-error', error: error.response.data })
    })
}

const register = (user) => (dispatch) => {
  return axios
    .post(`${API_URL}/user/create/`, {
      first_name: user.firstName,
      second_name: user.secondName,
      date_birth: user.dateBirth,
      phone_number: user.phoneNumber,
      gender: user.gender,
      email: user.email,
      city: user.city,
      username: user.username,
      password1: user.password1,
      password2: user.password2
    })
    .then((response) => {
      dispatch({ type: '@USER/register-success' })
    })
    .catch((error) => {
      dispatch({ type: '@USER/register-error', error: error?.response })
    })
}

const getUser = () => (dispatch) => {
  return axios
    .get(`${API_URL}/user/my`, {
      headers: authHeader()
    })
    .then((response) => {
      dispatch({ type: '@USER/get-info-request' })

      if (response.data) {
        dispatch({ type: '@USER/get-info-success', isLoggedIn: true, user: response.data })
      }

      return response.data
    })
    .catch((error) => {
      dispatch({ type: '@USER/get-info-error', error: error?.response })
    })
}

const logout = () => (dispatch) => {
  dispatch({ type: '@USER/logout' })
  window.localStorage.removeItem('user')
}

export const userActions = {
  login,
  logout,
  register,
  getUser
}
