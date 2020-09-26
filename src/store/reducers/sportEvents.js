const initialState = {
  isLoading: false,
  tournaments: {}
}

export const lineMatches = (state = initialState, action) => {
  switch (action.type) {
  case '@EVENTS/load-line-tournaments-request':
    return {
      ...state,
      isLoading: false
    }

  case '@EVENTS/load-line-tournaments-success':
    return {
      isLoading: true,
      tournaments: {
        ...action.payload
      }
    }

  case '@EVENTS/load-line-tournaments-error':
    return {
      ...state,
      isLoading: false
    }

  default:
    return state
  }
}
