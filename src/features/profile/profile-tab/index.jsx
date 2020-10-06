import React from 'react'
import { TextField } from '@material-ui/core'
import { Button, Block } from '@app/ui'

import classes from './style.module.scss'

export const ProfileTab = () => {
  return (
    <>
      <h3>Пополнение баланса</h3>
      <form className={classes.form}>
        <div className='form-row row'>
          <div className='col-lg-5 col-12'>
            <TextField
              fullWidth
              placeholder='Введите сумму'
              type='text'
              variant='outlined'
            />
          </div>
        </div>

        <div className={classes.paymentMethods}>
          <div className={classes.paymentMethod}>
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

          <div className={classes.paymentMethod}>
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
