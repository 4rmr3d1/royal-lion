import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './style.module.scss'

export const Header = () => {
	return (
		<header>
			<div className='container'>
				<div className='row align-items-center'>
					<div classNames={`col-lg-2 col-auto ${classes.brand}`}>
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
					<div classNames={`col-lg-3 col-auto ${classes.userNav}`}>
						<NavLink to='/profile' className={classes.enter}>Вход</NavLink>
						<NavLink to='/registration' className='btn btn-mini'>
							Регистрация
						</NavLink>
					</div>
				</div>
			</div>
		</header>
	);
};
