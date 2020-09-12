const user = JSON.parse(localStorage.getItem('user'))

const initialState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null }

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
				isLoggedIn: false
			}
		case '@USER/login-sucess':
			return {
				...state,
				isLoggedIn: true,
				user: action.payload.user
			}
		case '@USER/login-error':
			return {
				...state,
				isLoggedIn: false,
				user: null
			}
		case '@USER/logout':
			return {
				...state,
				isLoggedIn: false,
				user: null
			}
		case '@USER/get-info-success':
			return {
				...state,
				user: action.user
			}
		case '@USER/get-info-failure':
			return {
				...state,
				error: action.error
			}
		default:
			return state
	}
}
