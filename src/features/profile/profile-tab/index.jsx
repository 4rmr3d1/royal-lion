import React from 'react'
import { Button, Block } from '@app/ui'

import classes from './style.module.scss'

export const ProfileTab = () => {
  return (
    <>
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
            <Block>
              <div className={classes.card}>
                <img
                  alt=''
                  src='img/qiwi.png'
                />
                <Button variant='big'>пополнить баланс</Button>
              </div>
            </Block>
          </div>

          <div className='col-lg-6'>
            <Block>
              <div className={classes.card}>
                <img
                  alt=''
                  src='img/visa-mastercard.png'
                />
                <Button variant='big'>пополнить баланс</Button>
              </div>
            </Block>
          </div>
        </div>
      </form>

      <div className={`row ${classes.rates}`}></div>
    </>
  )
}
