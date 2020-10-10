import { combineReducers } from 'redux'

import { authReducer } from './reducers/auth'
import { lineMatches, liveMatches, bet } from './reducers/sportEvents'

const initialState = {
  category: '1'
}

const selectedCategory = (state = initialState, action) => {
  switch (action.type) {
  case 'change-category':
    return {
      ...state,
      category: action.category
    }

  default:
    return state
  }
}

export const rootReducer = combineReducers({
  selectedCategory,
  authReducer,
  lineMatches,
  liveMatches,
  bet
})
