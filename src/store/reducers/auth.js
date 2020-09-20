const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  isLoggedIn: false,
  properties: {
    authModalVisible: false
  },
  user: {
    key: user?.key,
    error: null
  }
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case '@USER/register-success':
    return {
      ...state,
      isLoggedIn: false
    }

  case '@USER/register-error':
    return {
      ...state,
      user: {
        ...state.user,
        error: action.error
      },
      isLoggedIn: false
    }

  case '@USER/login-request':
    return {
      ...state,
      user: action.user
    }

  case '@USER/login-success':
    return {
      ...state,
      isLoggedIn: true,
      user: action.user
    }

  case '@USER/login-error':
    return {
      ...state,
      isLoggedIn: false,
      user: {
        ...state.user,
        error: action.error
      }
    }

  case '@USER/logout':
    return {
      ...state,
      isLoggedIn: false,
      user: null
    }

  case '@USER/get-info-request':
    return {
      ...state
    }

  case '@USER/get-info-success':
    return {
      ...state,
      isLoggedIn: true,
      user: action.user
    }

  case '@USER/get-info-error':
    return {
      ...state,
      error: action.error
    }

  case '@USER/change-property':
    return {
      ...state,
      properties: {
        ...action.payload
      }
    }

  case '@USER/reset':
    return {
      ...state
    }

  default:
    return state
  }
}
