import { combineReducers } from 'redux'

const initialState = {
	category: null
}

const reducer = (state = initialState, action) => {
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

export const rootReducer = combineReducers({ reducer })
