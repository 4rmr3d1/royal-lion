import axios from 'axios'
import history from '@app/lib/history'

export const API_URL = 'https://api.royal-lion.bet'

export function authHeader () {
  const user = JSON.parse(localStorage.getItem('user'))

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
        localStorage.setItem('user', JSON.stringify(response.data))

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
      console.log(error)
      dispatch({ type: '@USER/login-error', error: error.response.data })
    })
}

const register = ({ user, resetForm, onSuccess }) => (dispatch) => {
  dispatch({ type: '@USER/register-request' })

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
      if (response.data) {
        dispatch({ type: '@USER/register-success', isRegistred: response.data?.success })
        onSuccess()
        resetForm()
      }

      if (response.status === 201) {
        setTimeout(() => {
          history.push('/')
        }, 3000)
      }
    })
    .catch((error) => {
      dispatch({ type: '@USER/register-error', error: error?.response?.data?.errors })
    })
}

const getUser = () => (dispatch) => {
  dispatch({ type: '@USER/get-info-request' })

  return axios.get(`${API_URL}/user/my/`, {
    headers: authHeader()
  })
    .then((response) => {
      if (response.data) {
        dispatch({ type: '@USER/get-info-success', isLoggedIn: response.data.success, user: response.data })
      }
    })
    .catch((error) => {
      console.log(error)
      dispatch({ type: '@USER/get-info-error', error: error?.response })
    })
}

const logout = () => (dispatch) => {
  dispatch({ type: '@USER/logout' })
  localStorage.removeItem('user')
  history.push('/')
}

const changePassword = (data, { resetForm }) => (dispatch) => {
  dispatch({ type: '@USER/change-password' })

  return axios.post(`${API_URL}/user/password/change/`, {
    old_password: data.oldPassword,
    password1: data.newPassword,
    password2: data.newPasswordConfirm
  }, {
    headers: authHeader()
  })
    .then(response => {
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
  dispatch({ type: '@USER/change-contacts' })

  return axios.put(`${API_URL}/user/my/change/`, {
    phone_number: String(data.phoneNumber).trim(),
    email: data.email
  }, {
    headers: authHeader()
  })
    .then(response => {
      if (response.data) {
        dispatch({ type: '@USER/change-contacts-success', user: response.data })
        dispatch(userActions.getUser())
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

const createRequest = ({ data, onSuccess, resetForm }) => (dispatch) => {
  dispatch({ type: '@USER/create-request' })

  return axios.post(`${API_URL}/support/request/create/`, {
    department: data.department,
    request: data.request,
    email_to_answer: data.email
  }, {
    headers: authHeader()
  })
    .then(response => {
      if (response.data) {
        dispatch({ type: '@USER/create-request-success', success: response.data.success })
        onSuccess()
        resetForm()
      }
    })
    .catch(error => {
      dispatch({ type: '@USER/create-request-error', error: error })
    })
}

export const userActions = {
  activateAccount,
  login,
  logout,
  register,
  getUser,
  changePassword,
  changeContacts,
  createRequest
}

const loadLineTournaments = ({ sportId, page }) => dispatch => {
  dispatch({ type: '@EVENTS/load-line-tournaments-request' })

  return axios.get(`${API_URL}/sport_events/line/tournaments/list/${sportId}/${page}`, { headers: authHeader() })
    .then(response => {
      if (response.data) {
        dispatch({
          type: '@EVENTS/load-line-tournaments-success',
          payload: response.data.data,
          length: response.data.length
        })
      }
    })
    .catch(error => {
      dispatch({ type: '@EVENTS/load-line-tournaments-error', error: error.response })
    })
}

export const line = {
  loadLineTournaments
}

const loadLiveTournaments = ({ sportId, page }) => dispatch => {
  dispatch({ type: '@EVENTS/load-live-tournaments-request' })

  return axios.get(`${API_URL}/sport_events/live/tournaments/list/${sportId}/${page}`)
    .then(response => {
      if (response.data) {
        dispatch({
          type: '@EVENTS/load-live-tournaments-success',
          payload: response.data.data,
          length: response.data.length
        })
      }
    })
    .catch(error => {
      dispatch({ type: '@EVENTS/load-live-tournaments-error', error: error.response })
    })
}

export const live = {
  loadLiveTournaments
}

const loadResults = ({ sportId, page }) => dispatch => {
  dispatch({ type: '@EVENTS/load-results-request' })

  return axios.get(`${API_URL}/sport_events/results/${sportId}/${page}`)
    .then(response => {
      if (response.data) {
        dispatch({
          type: '@EVENTS/load-results-success',
          payload: response.data.data,
          length: response.data.length
        })
      }
    })
    .catch(error => {
      dispatch({ type: '@EVENTS/load-results-error', error: error.response })
    })
}

export const results = {
  loadResults
}

const makeBet = ({ betType, amount, betId, onSuccess }) => dispatch => {
  dispatch({ type: '@BET/make-bet-request' })

  return axios.post(`${API_URL}/bet/make/${betType}`,
    { amount, bets_ids: [betId] },
    { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        dispatch({ type: '@BET/make-bet-success' })
        dispatch({ type: '@USER/change-property', payload: { betModalVisible: false } })
        dispatch(userActions.getUser())
      }
      onSuccess()
    })
    .catch((error) => {
      dispatch({ type: '@BET/make-bet-error', error: error.response.data.errors })
    })
}

const getBets = () => dispatch => {
  dispatch({ type: '@BET/get-bets-request' })

  return axios.get(`${API_URL}/bet/userbets/`,
    { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        dispatch({ type: '@BET/get-bets-success', betHistory: response.data.data })
      }
    })
    .catch(error => {
      dispatch({ type: '@BET/get-bets-error', error: error.response?.data.errors })
    })
}

const checkBetCoupon = ({ ticket }) => dispatch => {
  dispatch({ type: '@BET/check-coupon-request' })

  return axios.get(`${API_URL}/bet/ticket/${ticket}`,
    { headers: authHeader() })
    .then(response => {
      if (response.data) {
        dispatch({ type: '@BET/check-coupon-success', coupon: response.data.data })
      }
    })
    .catch(error => {
      dispatch({ type: '@BET/check-coupon-error', couponError: error.response.data.errors })
      console.log(error.response)
    })
}

export const bet = {
  makeBet,
  getBets,
  checkBetCoupon
}

const paymentsInput = ({ amount, onSuccess }) => dispatch => {
  return axios.post(`${API_URL}/payments/input/create`,
    { amount },
    { headers: authHeader() })
    .then(response => {
      if (response.data) {
        window.open(`${response.data.data.url}`)
      }
    })
    .catch(error => {
      dispatch({ type: '@PAYMENT/payment-input-error', error: error.response.data.errors })
    })
}

const paymentOutput = ({ amount, onSuccess }) => dispatch => {
  return axios.post(`${API_URL}/payments/output/create`,
    { amount },
    { headers: authHeader() })
    .then(response => {
      dispatch({ type: '@PAYMENT/payment-output-error' })
      onSuccess()
      dispatch(getPaymentsOutput())
    })
    .catch(error => {
      dispatch({ type: '@PAYMENT/payment-output-error', error: error.response.data.errors })
    })
}

const getPaymentsOutput = () => dispatch => {
  dispatch({ type: '@PAYMENT/get-payment-output-request' })

  return axios.get(`${API_URL}/payments/output/`,
    { headers: authHeader() })
    .then(response => {
      dispatch({ type: '@PAYMENT/get-payment-output-success', payload: response.data.data })
    })
    .catch(error => {
      dispatch({ type: '@PAYMENT/get-payment-output-error', error: error.response.data.errors })
    })
}

export const payment = {
  paymentsInput,
  paymentOutput,
  getPaymentsOutput
}
