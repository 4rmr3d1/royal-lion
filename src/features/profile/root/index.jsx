import React from 'react'
import { Redirect } from 'react-router-dom'
import { ProfileCard, Button } from '@app/ui'
import { useDispatch, useSelector } from '@app/store'
import { userActions } from '@app/store/actions/userActions'

import classes from './style.module.scss'

export const Profile = () => {
  const { dispatch } = useDispatch()

  const isLoggedIn = useSelector(state => state.authReducer?.isLoggedIn)
  const firstName = useSelector((state) => state.authReducer?.user?.data?.first_name)
  const secondName = useSelector((state) => state.authReducer?.user?.data?.second_name)
  const email = useSelector((state) => state.authReducer.user?.data?.email)

  React.useEffect(() => {
    dispatch(userActions.getUser())
  }, [dispatch])

  if (!isLoggedIn) {
    return <Redirect to='/' />
  }

  return (
    <section className={classes.profile}>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3'>
            <ProfileCard
              email={email}
              firstName={firstName}
              secondName={secondName}
            />
          </div>

          <div className={`col-lg-8 ${classes.ballanceUp}`}>
            <h3>Пополнение баланса</h3>
            <form className='form'>
              <div className='form-row row'>
                <div className='col-lg-5'>
                  <input
                    placeholder='Введите сумму'
                    type='text'
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-6'>
                  <div className={classes.card}>
                    <img
                      alt=''
                      src='img/qiwi.png'
                    />
                    <Button variant='big'>пополнить баланс</Button>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className={classes.card}>
                    <img
                      alt=''
                      src='img/visa-mastercard.png'
                    />
                    <Button variant='big'>пополнить баланс</Button>
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
