import React from 'react';
import './index.scss';

export const Contact = () => {
	return (
		<section className='contact'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-5'>
						<p className='subtitle'>Обратная связь</p>
						<h2>Остались вопросы?</h2>
						<p className='text'>
							У вас остались вопросы или есть предложения по улучшению сервиса?
							Пишите нам на почту или в форме справа, наш менеджер вам ответит в
							ближайшее время
						</p>

						<p className='graffic'>Понедельник - Воскресенье: 8:00 - 22:00</p>

						<div className='contact-email'>mailforexample@gmail.com</div>
					</div>
					<form className='form col-lg-6 ml-lg-auto'>
						<div className='row form-row'>
							<div className='col-lg-6'>
								<label htmlFor='contact-name'>Имя</label>
								<input type='text' id='contact-name' />
							</div>
							<div className='col-lg-6'>
								<label htmlFor='contact-phone'>Телефон</label>
								<input type='tel' id='contact-phone' />
							</div>
						</div>
						<div className='row form-row'>
							<div className='col-lg-12'>
								<label htmlFor='contact-text'>Сообщение</label>
								<textarea id='contact-text'></textarea>
							</div>
						</div>
						<div className='row form-row align-items-center'>
							<div className='col-lg-6'>
								<button className='btn btn-big'>задать вопрос</button>
							</div>
							<div className='col-lg-6'>
								<div className='agree'>
									Нажимая на кнопку вы соглашаетесь с правилами{' '}
									<span>обработки данных</span>{' '}
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};
