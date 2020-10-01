import axios from 'axios'
import history from '@app/lib/history'

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
  return axios.post(`${API_URL}/user/auth/login/`, { username, password })
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
        history.push('/profile')
      }

      return response.data.key
    })
    .catch((error) => {
      dispatch({ type: '@USER/login-error', error: error.response.data })
    })
}

const register = (user, { resetForm }) => (dispatch) => {
  return axios.post(`${API_URL}/user/create/`, {
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
      dispatch({ type: '@USER/register-request' })

      if (response.data?.success) {
        dispatch({ type: '@USER/register-success', isRegistred: response.data?.success })
        resetForm()
      }
    })
    .catch((error) => {
      dispatch({ type: '@USER/register-error', error: error?.response?.data?.errors })
    })
}

const getUser = () => (dispatch) => {
  return axios.get(`${API_URL}/user/my`, {
    headers: authHeader()
  })
    .then((response) => {
      dispatch({ type: '@USER/get-info-request' })

      setTimeout(() => {
        if (response.data) {
          dispatch({ type: '@USER/get-info-success', isLoggedIn: true, user: response.data })
        }

        return response.data
      }, 5000)
    })
    .catch((error) => {
      dispatch({ type: '@USER/get-info-error', error: error?.response })
    })
}

const logout = () => (dispatch) => {
  dispatch({ type: '@USER/logout' })
  window.localStorage.removeItem('user')
}

const changePassword = (data, { resetForm }) => (dispatch) => {
  return axios.post(`${API_URL}/user/password/change/`, {
    old_password: data.oldPassword,
    password1: data.newPassword,
    password2: data.newPasswordConfirm
  }, {
    headers: authHeader()
  })
    .then(response => {
      dispatch({ type: '@USER/change-password' })

      if (response.data) {
        dispatch({ type: '@USER/change-password-success', user: response.data.success })
        resetForm()
      }
    })
    .catch(error => {
      dispatch({ type: '@USER/change-password-error', error: error?.response.data, changed: error?.response.success })
    })
}

const changeContacts = data => dispatch => {
  return axios.put(`${API_URL}/user/my/change/`, {
    phone_number: String(data.phoneNumber).trim(),
    email: data.email
  }, {
    headers: authHeader()
  })
    .then(response => {
      dispatch({ type: '@USER/change-contacts' })

      if (response.data) {
        dispatch({ type: '@USER/change-contacts-success', user: response.data })
      }
    })
    .catch(error => {
      dispatch({ type: '@USER/change-contacts-error', error: error.response })
    })
}

const activateAccount = ({ code }) => dispatch => {
  return axios.post(`${API_URL}/user/my/activate/${code}`)
    .then(response => {
      if (response.data) {
        dispatch({ type: '@USER/account-activation-success', activation: response.data?.success })
      }
    })
    .catch(error => {
      dispatch({ type: '@USER/account-activation-error', activation: error.response?.data.success, error: error?.response.data.errors })
    })
}

export const userActions = {
  activateAccount,
  login,
  logout,
  register,
  getUser,
  changePassword,
  changeContacts
}

const loadLineTournaments = ({ sportId, countryId = '0', count = '0' }) => dispatch => {
  dispatch({ type: '@EVENTS/load-line-tournaments-request' })

  return axios.get(`${API_URL}/sport_events/line/tournaments/list/${sportId}`, { headers: authHeader() })
    .then(response => {
      if (response.data) {
        dispatch({ type: '@EVENTS/load-line-tournaments-success', payload: response.data.data })
      }
    })
    .catch(error => {
      dispatch({ type: '@EVENTS/load-line-tournaments-error', error: error.response })
    })
}

const loadLineTournametMatches = ({ tournamentId, count = '0' }) => dispatch => {
  return axios.get(`${API_URL}/sport_events/line/tournaments/${tournamentId}/${count}`)
    .then(response => {
      dispatch({ type: '@EVENTS/load-line-tournament-matches-request', isLoading: true })

      if (response.data) {
        dispatch({ type: '@EVENTS/load-line-tournament-matches-success', matches: response.data })
      }
    })
    .catch(error => {
      dispatch({ type: '@USER/load-line-tournament-matches-error', error: error.response })
    })
}

export const line = {
  loadLineTournaments,
  loadLineTournametMatches
}

const loadLiveTournaments = ({ sportId, countryId = '0', count = '0' }) => dispatch => {
  return axios.get(`${API_URL}/sport_events/live/tournaments/list/${sportId}`)
    .then(response => {
      dispatch({ type: '@EVENTS/load-live-tournaments-request', isLoading: true })

      if (response.data) {
        dispatch({ type: '@EVENTS/load-live-tournaments-success', tournaments: response.data })
      }
    })
    .catch(error => {
      dispatch({ type: '@EVENTS/load-live-tournaments-error', error: error.response })
    })
}

const loadLiveTournametMatches = ({ tournamentId, count = '0' }) => dispatch => {
  return axios.get(`${API_URL}/sport_events/live/tournaments/${tournamentId}/${count}`)
    .then(response => {
      dispatch({ type: '@EVENTS/load-live-tournament-matches-request', isLoading: true })

      if (response.data) {
        dispatch({ type: '@EVENTS/load-live-tournament-matches-success', matches: response.data })
      }
    })
    .catch(error => {
      dispatch({ type: '@USER/load-live-tournament-matches-error', error: error.response })
    })
}

export const live = {
  loadLiveTournaments,
  loadLiveTournametMatches
}
