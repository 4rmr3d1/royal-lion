import axios from 'axios'

const API_URL = 'http://45.67.58.94'

export function authHeader() {
	const user = JSON.parse(localStorage.getItem('user'))

	if (user && user.key) {
		return { Authorization: `Token ${user.key}` }
	} else {
		return {}
	}
}

function login({ username, password }) {
	return axios
		.post(`${API_URL}/user/auth/login/`, { username, password })
		.then((response) => {
			if (response.data.key) {
				localStorage.setItem('user', JSON.stringify(response.data))
			}
		})
}

function register({
	firstName,
	secondName,
	email,
	dateBirth,
	phoneNumber,
	gender,
	city,
	username,
	password1,
	password2
}) {
	return axios
		.post(`${API_URL}/user/create/`, {
			first_name: firstName,
			second_name: secondName,
			date_birth: dateBirth,
			phone_number: phoneNumber,
			gender: gender,
			email,
			city,
			username,
			password1,
			password2
		})
		.then((response) => {
			return response.data
		})
}

function getUser() {
	return axios
		.get(`${API_URL}/user/my`, {
			headers: authHeader()
		})
		.then((response) => {
			return response.data
		})
}

export const userService = {
	login,
	register,
	getUser
}
