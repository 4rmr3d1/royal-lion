import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField
} from '@material-ui/core'
import { useDispatch, useSelector } from '@app/store'
import { Button } from '@app/ui'

import { userActions } from '@app/store/actions/userActions'

import classes from './style.module.scss'

export const LoginModal = ({ visible, onClose }) => {
	const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn)
	const { dispatch } = useDispatch()
	const history = useHistory()

	const [authData, setAuthData] = React.useState({
		username: '',
		password: ''
	})

	const onUsernameChange = React.useCallback(
		(e) => {
			const username = e.target.value
			setAuthData({ ...authData, username })
		},
		[authData]
	)

	const onPasswordChange = React.useCallback(
		(e) => {
			const password = e.target.value
			setAuthData({ ...authData, password })
		},
		[authData]
	)

	const onSubmit = React.useCallback(
		(e) => {
			e.preventDefault()

			dispatch(userActions.login(authData))

			if (isLoggedIn) {
				history.push('/profile')
			}
		},
		[dispatch, authData]
	)

	return (
		<Dialog open={visible} onClose={onClose}>
			<DialogTitle style={{ textAlign: 'center' }} disableTypography>
				<h2>Авторизация</h2>
			</DialogTitle>
			<DialogContent>
				<form className={classes.form} onSubmit={onSubmit}>
					<div>
						<TextField
							variant='outlined'
							placeholder={'Почта'}
							onChange={onUsernameChange}
						/>
					</div>

					<div>
						<TextField
							variant='outlined'
							placeholder={'Пароль'}
							onChange={onPasswordChange}
						/>
					</div>

					<div>
						<Button type='small'> Войти </Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
