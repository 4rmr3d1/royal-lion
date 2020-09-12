import { userService } from '@app/services/user'
import { useHistory } from 'react-router-dom'

function login(username, password) {
	return (dispatch) => {
		dispatch(request({ username }))

		userService.login(username, password).then(
			(user) => {
				dispatch(success(user))
			},
			(error) => {
				dispatch(failure(error.toString()))
			}
		)
	}
	function request(user) {
		return { type: '@USER/login-request', user }
	}
	function success(user) {
		return { type: '@USER/login-success', user }
	}
	function failure(error) {
		return { type: '@USER/login-error', error }
	}
}

function register(user) {
	return (dispatch) => {
		dispatch(request(user))

		userService.register(user).then(
			(user) => {
				dispatch(success())
			},
			(error) => {
				dispatch(failure(error.toString()))
			}
		)
	}

	function request(user) {
		return { type: '@USER/register-request', user }
	}
	function success(user) {
		return { type: '@USER/register-success', user }
	}
	function failure(error) {
		return { type: '@USER/register-error', error }
	}
}

function getUser() {
	return (dispatch) => {
		dispatch(request())

		userService.getUser().then((user) => {
			dispatch(success(user.data))
		})
	}

	function request() {
		return { type: '@USER/get-info-request' }
	}
	function success(user) {
		return { type: '@USER/get-info-success', user }
	}
	function failure(error) {
		return { type: '@USER/get-info-failure', error }
	}
}

export const userActions = {
	login,
	register,
	getUser
}
