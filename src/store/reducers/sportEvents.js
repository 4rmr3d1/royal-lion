const lineMatchesInitialState = {
  isLoaded: false,
  tournaments: [],
  error: ''
}

export const lineMatches = (state = lineMatchesInitialState, action) => {
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

const liveMatchesInitialState = {
  isLoaded: false,
  tournaments: [],
  error: ''
}

export const liveMatches = (state = liveMatchesInitialState, action) => {
  switch (action.type) {
  case '@EVENTS/load-live-tournaments-request':
    return {
      ...state,
      isLoaded: false
    }

  case '@EVENTS/load-live-tournaments-success':
    return {
      isLoaded: true,
      tournaments: [
        ...action.payload
      ]
    }

  case '@EVENTS/load-live-tournaments-error':
    return {
      ...state,
      isLoaded: true,
      error: action.errror
    }

  default:
    return state
  }
}

const matchesResultInitialState = {
  matches: [],
  loading: false
}

export const results = (state = matchesResultInitialState, action) => {
  switch (action.type) {
  case '@EVENTS/load-results-request':
    return {
      loading: true
    }

  case '@EVENTS/load-results-success':
    return {
      matches: action.payload,
      loading: false
    }

  case '@EVENTS/load-results-error':
    return {
      loading: false
    }

  default:
    return state
  }
}

const betInitialState = {
  tournament: '',
  firstTeam: '',
  secondTeam: '',
  data: {},
  betError: ''
}

export const bet = (state = betInitialState, action) => {
  switch (action.type) {
  case '@BET/on-coefficient-click':
    return {
      ...state,
      firstTeam: action.firstTeam,
      secondTeam: action.secondTeam,
      tournament: action.tournament,
      data: { ...action.payload }
    }

  case '@BET/make-bet-error':
    return {
      ...state,
      betError: action.error
    }

  default:
    return state
  }
}

const paymentsInitialState = {
  outputError: '',
  inputError: ''
}

export const payments = (state = paymentsInitialState, action) => {
  switch (action.type) {
  case '@PAYMENT/payment-input-error':
    return {
      ...state,
      inputError: action.error
    }

  case '@PAYMENT/payment-output-error':
    return {
      ...state,
      outputError: action.error
    }

  default:
    return state
  }
}
