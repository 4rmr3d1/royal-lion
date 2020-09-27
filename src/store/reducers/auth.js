const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  isLoggedIn: false,
  isRegistred: false,
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
  case '@USER/register-request':
    return {
      ...state,
      isRegistered: false
    }

  case '@USER/register-success':
    return {
      ...state,
      isRegistred: action.isRegistred,
      user: {
        ...action.user,
        error: null
      }
    }

  case '@USER/register-error':
    return {
      ...state,
      isRegistred: false,
      user: {
        ...state.user,
        error: action.error
      }
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

  case '@USER/change-password':
    return {
      ...state,
      isPasswordChanging: true
    }

  case '@USER/change-password-success':
    return {
      ...state,
      error: null,
      isPasswordChanging: false,
      user: {
        ...state.user,
        changePassword: {
          isChanged: action.user
        }
      }
    }

  case '@USER/change-password-error':
    return {
      ...state,
      error: action.error,
      isPasswordChanging: false,
      user: {
        ...state.user,
        changePassword: {
          isChanged: action.changed
        }
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
