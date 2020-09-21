import React from 'react'
import { Button } from '@app/ui'

import classes from './style.module.scss'

export const ProfileTab = () => {
  return (
    <>
      <div className={classes.ballanceUp}>
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

      <div className={`row ${classes.rates}`}></div>
    </>
  )
}
