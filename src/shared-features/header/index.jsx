import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.scss';

export const Header = () => {
	return (
		<header>
			<div className='container'>
				<div className='row align-items-center'>
					<div className='col-lg-2 col-auto brand'>
						<NavLink to='/'>
							<img src='img/logo.svg' alt='' />
						</NavLink>
					</div>
					<nav className='col-auto ml-auto mr-auto menu'>
						<NavLink exact to='/'>
							Линия
						</NavLink>
						<NavLink to='/live'>Лайв</NavLink>
						<NavLink to='/result'>Результаты</NavLink>
						<NavLink to='/contact'>Контакты</NavLink>
					</nav>
					<div className='col-lg-3 col-auto user-nav'>
						<button className='enter'>Вход</button>
						<NavLink to='/registration' className='btn btn-mini'>
							Регистрация
						</NavLink>
					</div>
				</div>
			</div>
		</header>
	);
};
