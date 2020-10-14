const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  registration: {
    isRegistered: false,
    registrating: false,
    error: null
  },
  login: {
    isLoggedIn: false,
    loggining: null,
    error: null
  },
  activation: {
    success: null,
    error: null
  },
  properties: {
    authModalVisible: false,
    betModalVisible: false,
    burgerVisible: false
  },
  user: {
    key: user?.key,
    error: null
  },
  configurations: {
    passwordChangeError: null,
    isPasswordChanging: false,
    isPasswordChanged: null,
    phoneOrEmailChangeError: null,
    phoneOrEmailChanging: false,
    isPhoneOrEmailChanged: null
  }
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case '@USER/register-request':
    return {
      ...state,
      registration: {
        ...state.registration,
        registrating: true
      }
    }

  case '@USER/register-success':
    return {
      ...state,
      registration: {
        isRegistred: action.isRegistred,
        registrating: false,
        error: null
      }
    }

  case '@USER/register-error':
    return {
      ...state,
      registration: {
        isRegistred: false,
        registrating: false,
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
      login: {
        ...state.login,
        isLoggedIn: action.isLoggedIn,
        error: null
      },
      error: null,
      user: action.user
    }

  case '@USER/login-error':
    return {
      ...state,
      login: {
        ...state.login,
        isLoggedIn: false,
        error: action.error
      },
      user: {
        ...state.user,
        error: action.error
      }
    }

  case '@USER/logout':
    return {
      ...state,
      login: {
        ...state.login,
        isLoggedIn: false
      }
    }

  case '@USER/get-info-request':
    return {
      ...state,
      login: {
        isLoggedIn: false,
        loggining: true
      }
    }

  case '@USER/get-info-success':
    return {
      ...state,
      login: {
        isLoggedIn: true,
        logginig: false
      },
      error: null,
      user: action.user
    }

  case '@USER/get-info-error':
    return {
      ...state,
      login: {
        ...state.login
      },
      error: action.error
    }

  case '@USER/change-property':
    return {
      ...state,
      properties: {
        ...state.properties,
        ...action.payload
      }
    }

  case '@USER/change-password':
    return {
      ...state,
      configurations: {
        ...state.configurations,
        isPasswordChanging: true
      }
    }

  case '@USER/change-password-success':
    return {
      ...state,
      configurations: {
        ...state.configurations,
        passwordChangeError: null,
        isPasswordChanging: false,
        isPasswordChanged: true
      }
    }

  case '@USER/change-password-error':
    return {
      ...state,
      configurations: {
        ...state.configurations,
        passwordChangeError: action.error,
        isPasswordChanging: false,
        isPasswordChanged: false
      }
    }

  case '@USER/change-contacts':
    return {
      ...state,
      configurations: {
        ...state.configurations,
        phoneOrEmailChanging: true
      }
    }

  case '@USER/change-contacts-success':
    return {
      ...state,
      user: {
        ...state.user,
        ...action.user
      },
      configurations: {
        ...state.configurations,
        phoneOrEmailChangeError: null,
        phoneOrEmailChanging: false,
        isPhoneOrEmailChanged: true
      }
    }

  case '@USER/change-contacts-error':
    return {
      ...state,
      configurations: {
        ...state.configurations,
        phoneOrEmailChangeError: action.error,
        phoneOrEmailChanging: false,
        isPhoneOrEmailChanged: false
      }
    }

  case '@USER/reset-configurations':
    return {
      ...state,
      configurations: {
        ...initialState.configurations
      }
    }

  case '@USER/account-activation-success': {
    return {
      ...state,
      activation: {
        success: action.activation
      }
    }
  }

  case '@USER/account-activation-error': {
    return {
      ...state,
      activation: {
        success: action.activation,
        error: action.error
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
