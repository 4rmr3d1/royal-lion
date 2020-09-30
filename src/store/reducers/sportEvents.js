const initialState = {
  isLoaded: false,
  tournaments: [],
  error: ''
}

export const lineMatches = (state = initialState, action) => {
  switch (action.type) {
  case '@EVENTS/load-line-tournaments-request':
    return {
      ...state,
      isLoaded: false
    }

  case '@EVENTS/load-line-tournaments-success':
    return {
      isLoaded: true,
      tournaments: [
        ...action.payload
      ]
    }

  case '@EVENTS/load-line-tournaments-error':
    return {
      ...state,
      isLoaded: true,
      error: action.errror
    }

  default:
    return state
  }
}
