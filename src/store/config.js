import { combineReducers } from 'redux'

import { authReducer } from './reducers/auth'
import message from './reducers/message'

const initialState = {
	category: null
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
	message
})
