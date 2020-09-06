import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

export const Registration = () => {
	return (
		<section className='registration'>
			<div className='container'>
				<div className='row justify-content-between title'>
					<div className='col-auto'>
						<h3>Регистрация</h3>
					</div>
					<div className='col-auto'>
						<Link to='/'>Уже есть аккаунт?</Link>
					</div>
				</div>
				<form className='form'>
					<div className='form-row row'>
						<div className='col-12'>
							<h4>Персональные данные:</h4>
						</div>
					</div>
					<div className='form-row row'>
						<div className='col-lg-4'>
							<input type='text' placeholder='Ваше имя' />
						</div>
						<div className='col-lg-4'>
							<input type='email' placeholder='Ваш e-mail' />
						</div>
						<div className='col-lg-4'>
							<input type='text' placeholder='Дата рождения' />
						</div>
					</div>
					<div className='form-row row'>
						<div className='col-lg-4'>
							<input type='text' placeholder='Ваша фамилия' />
						</div>
						<div className='col-lg-4'>
							<input type='text' placeholder='Ваш номер телефона' />
						</div>
						<div className='col-lg-4'>
							<input type='text' placeholder='Ваш пол' />
						</div>
					</div>
					<div className='form-row row'>
						<div className='col-lg-4'>
							<input type='text' placeholder='Город проживания' />
						</div>
					</div>
					<div className='form-row row'>
						<div className='col-12'>
							<h4>Данные для входа:</h4>
						</div>
					</div>
					<div className='form-row row'>
						<div className='col-lg-4'>
							<input type='text' placeholder='Логин для входа на сайт' />
						</div>
						<div className='col-lg-4'>
							<input type='text' placeholder='Пароль' />
						</div>
						<div className='col-lg-4'>
							<input type='text' placeholder='Повторите пароль' />
						</div>
					</div>
					<div className='form-row row align-items-center'>
						<div className='col-lg-4'>
							<button className='btn btn-big'>зарегистрироваться</button>
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
