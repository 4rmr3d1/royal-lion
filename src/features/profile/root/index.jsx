import React from 'react'
import { ProfileCard, Button } from '@app/ui'
import { useDispatch, useSelector } from '@app/store'
import { userActions } from '@app/store/actions/userActions'

import classes from './style.module.scss'

export const Profile = () => {
	const { dispatch } = useDispatch()
	const firstName = useSelector((state) => state.authReducer.user.first_name)
	const secondName = useSelector((state) => state.authReducer.user.second_name)
	const email = useSelector((state) => state.authReducer.user.email)

	React.useEffect(() => {
		dispatch(userActions.getUser())
	}, [])

	return (
		<section className={classes.profile}>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-3'>
						<ProfileCard
							firstName={firstName}
							secondName={secondName}
							email={email}
						/>
					</div>

					<div className={`col-lg-8 ${classes.ballanceUp}`}>
						<h3>Пополнение баланса</h3>
						<form className='form'>
							<div className='form-row row'>
								<div className='col-lg-5'>
									<input type='text' placeholder='Введите сумму' />
								</div>
							</div>

							<div className='row'>
								<div className='col-lg-6'>
									<div className={classes.card}>
										<img src='img/qiwi.png' alt='' />
										<Button type='big'>пополнить баланс</Button>
									</div>
								</div>

								<div className='col-lg-6'>
									<div className={classes.card}>
										<img src='img/visa-mastercard.png' alt='' />
										<Button type='big'>пополнить баланс</Button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className={`row ${classes.rates}`}></div>
			</div>
		</section>
	)
}
