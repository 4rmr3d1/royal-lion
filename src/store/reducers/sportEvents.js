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

const betInitialState = {
  tournament: '',
  firstTeam: '',
  secondTeam: '',
  data: {}
}

export const bet = (state = betInitialState, action) => {
  switch (action.type) {
  case '@BET/on-coefficient-click':
    return {
      firstTeam: action.firstTeam,
      secondTeam: action.secondTeam,
      tournament: action.tournament,
      data: { ...action.payload }
    }

  default:
    return state
  }
}
