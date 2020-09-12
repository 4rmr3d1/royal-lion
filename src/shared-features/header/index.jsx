import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from '@app/store'
import { LoginModal } from '../login-modal'

import classes from './style.module.scss'

export const Header = () => {
	const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn)

	const [loginModalVisible, setLoginModalVisible] = React.useState(false)

	return (
		<>
			<LoginModal
				visible={loginModalVisible}
				onClose={() => setLoginModalVisible(false)}
			/>

			<header>
				<div className='container'>
					<div className='row align-items-center'>
						<div className={`col-lg-2 col-auto ${classes.brand}`}>
							<NavLink to='/'>
								<img src='img/logo.svg' alt='' />
							</NavLink>
						</div>
						<nav className={`col-auto ml-auto mr-auto ${classes.menu}`}>
							<NavLink exact to='/'>
								Линия
							</NavLink>
							<NavLink to='/live'>Лайв</NavLink>
							<NavLink to='/result'>Результаты</NavLink>
							<NavLink to='/contact'>Контакты</NavLink>
						</nav>
						<div className={`col-lg-3 col-auto ${classes.userNav}`}>
							<a
								href='#'
								onClick={() => setLoginModalVisible(true)}
								className={classes.enter}
							>
								Вход
							</a>
							<NavLink to='/registration' className='btn btn-mini'>
								Регистрация
							</NavLink>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
