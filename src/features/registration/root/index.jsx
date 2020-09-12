import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from '@app/store'
import { Button } from '@app/ui'
import { userActions } from '@app/store/actions/userActions'

import classes from './style.module.scss'

export const Registration = () => {
	const { dispatch } = useDispatch()
	const [registrationData, setRegistrationData] = React.useState({
		firstName: '',
		secondName: '',
		email: '',
		dateBirth: '',
		phoneNumber: '',
		gender: null,
		city: '',
		username: '',
		password1: '',
		password2: ''
	})

	const onFirstNameChange = React.useCallback(
		(e) => {
			const firstName = e.target.value
			setRegistrationData({ ...registrationData, firstName })
		},
		[registrationData]
	)

	const onSecondNameChange = React.useCallback(
		(e) => {
			const secondName = e.target.value
			setRegistrationData({ ...registrationData, secondName })
		},
		[registrationData]
	)

	const onEmailChange = React.useCallback(
		(e) => {
			const email = e.target.value
			setRegistrationData({ ...registrationData, email })
		},
		[registrationData]
	)

	const onDateBirthChange = React.useCallback(
		(e) => {
			const dateBirth = e.target.value
			setRegistrationData({ ...registrationData, dateBirth })
		},
		[registrationData]
	)

	const onPhoneNumberChange = React.useCallback(
		(e) => {
			const phoneNumber = e.target.value
			setRegistrationData({ ...registrationData, phoneNumber })
		},
		[registrationData]
	)

	const onGenderChange = React.useCallback(
		(e) => {
			const gender = e.target.value
			setRegistrationData({ ...registrationData, gender })
		},
		[registrationData]
	)

	const onCityChange = React.useCallback(
		(e) => {
			const city = e.target.value
			setRegistrationData({ ...registrationData, city })
		},
		[registrationData]
	)

	const onUsernameChange = React.useCallback(
		(e) => {
			const username = e.target.value
			setRegistrationData({ ...registrationData, username })
		},
		[registrationData]
	)

	const onPassword1Change = React.useCallback(
		(e) => {
			const password1 = e.target.value
			setRegistrationData({ ...registrationData, password1 })
		},
		[registrationData]
	)

	const onPassword2Change = React.useCallback(
		(e) => {
			const password2 = e.target.value
			setRegistrationData({ ...registrationData, password2 })
		},
		[registrationData]
	)

	const onSubmit = React.useCallback(
		(e) => {
			e.preventDefault()

			dispatch(userActions.register(registrationData))
		},
		[registrationData, dispatch]
	)

	const enterTest = React.useCallback(() => {}, [])

	return (
		<section className={classes.registration}>
			<div className='container'>
				<div className={`row justify-content-between ${classes.title}`}>
					<div className='col-auto'>
						<h3>Регистрация</h3>
					</div>
					<div className='col-auto'>
						<Link to='/'>Уже есть аккаунт?</Link>
					</div>
				</div>
				<form className='form' onSubmit={onSubmit}>
					<div className='form-row row'>
						<div className='col-12'>
							<h4>Персональные данные:</h4>
						</div>
					</div>
					<div className='form-row row'>
						<div className='col-lg-4'>
							<input
								type='text'
								placeholder='Ваше имя'
								onChange={onFirstNameChange}
							/>
						</div>
						<div className='col-lg-4'>
							<input
								type='email'
								placeholder='Ваш e-mail'
								onChange={onEmailChange}
							/>
						</div>
						<div className='col-lg-4'>
							<input
								type='text'
								placeholder='Дата рождения'
								onChange={onDateBirthChange}
							/>
						</div>
					</div>
					<div className='form-row row'>
						<div className='col-lg-4'>
							<input
								type='text'
								placeholder='Ваша фамилия'
								onChange={onSecondNameChange}
							/>
						</div>
						<div className='col-lg-4'>
							<input
								type='text'
								placeholder='Ваш номер телефона'
								onChange={onPhoneNumberChange}
							/>
						</div>
						<div className='col-lg-4'>
							<input
								type='text'
								placeholder='Ваш пол'
								onChange={onGenderChange}
							/>
						</div>
					</div>
					<div className='form-row row'>
						<div className='col-lg-4'>
							<input
								type='text'
								placeholder='Город проживания'
								onChange={onCityChange}
							/>
						</div>
					</div>
					<div className='form-row row'>
						<div className='col-12'>
							<h4>Данные для входа:</h4>
						</div>
					</div>
					<div className='form-row row'>
						<div className='col-lg-4'>
							<input
								type='text'
								placeholder='Логин для входа на сайт'
								onChange={onUsernameChange}
							/>
						</div>
						<div className='col-lg-4'>
							<input
								type='text'
								placeholder='Пароль'
								onChange={onPassword1Change}
							/>
						</div>
						<div className='col-lg-4'>
							<input
								type='text'
								placeholder='Повторите пароль'
								onChange={onPassword2Change}
							/>
						</div>
					</div>
					<div className='form-row row align-items-center'>
						<div className='col-lg-4'>
							<Button type='big' label='Зарегистрироваться' />
						</div>
						<div className='col-lg-3'>
							<p className='agree'>
								Нажимая на кнопку вы соглашаетесь с правилами{' '}
								<span>обработки данных</span>{' '}
							</p>
						</div>
					</div>
				</form>
			</div>
		</section>
	)
}
