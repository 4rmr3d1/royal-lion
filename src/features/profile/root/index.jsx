import React from 'react'
import { ProfileCard } from '@app/ui'

import './index.scss'

export const Profile = () => {
	return (
		<section className='profile'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-3'>
						<ProfileCard />
					</div>

					<div className='col-lg-8 ballance-up'>
						<h3>Пополнение баланса</h3>
						<form className='form'>
							<div className='form-row row'>
								<div className='col-lg-5'>
									<input type='text' placeholder='Введите сумму' />
								</div>
							</div>

							<div className='row'>
								<div className='col-lg-6'>
									<div className='card'>
										<img src='img/qiwi.png' alt='' />
										<button className='btn-big btn'>пополнить баланс</button>
									</div>
								</div>

								<div className='col-lg-6'>
									<div className='card'>
										<img src='img/visa-mastercard.png' alt='' />
										<button className='btn-big btn'>пополнить баланс</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className='row rates'></div>
			</div>
		</section>
	)
}
