import React from 'react'
import { TextField } from '@material-ui/core'
import { Button, Block } from '@app/ui'
import { useDispatch, useSelector, payment } from '@app/store'

import classes from './style.module.scss'

export const ProfileTab = () => {
  const { dispatch } = useDispatch()
  const error = useSelector(state => state.payments?.inputError)
  const [amount, setAmount] = React.useState(100)

  const onAmountChange = React.useCallback((e) => {
    setAmount(e.target.value)
  }, [setAmount])

  const onSubmit = React.useCallback((e) => {
    e.preventDefault(e)

    dispatch(payment.paymentsInput({ amount }))
  })

  return (
    <>
      <h3>Пополнение баланса</h3>
      <form
        className={classes.form}
        onSubmit={onSubmit}
      >
        <div className='form-row row'>
          <div className='col-lg-5 col-12'>
            <TextField
              error={!!error}
              fullWidth
              placeholder='Введите сумму'
              type='text'
              value={amount}
              variant='outlined'
              onChange={onAmountChange}
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
                <Button
                  color='primary'
                  type='submit'
                  variant='big'
                >
                  пополнить баланс
                </Button>
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
                <Button
                  color='primary'
                  type='submit'
                  variant='big'
                >
                пополнить баланс
                </Button>
              </div>
            </Block>
          </div>
        </div>
      </form>

      <div className={`row ${classes.rates}`}></div>
    </>
  )
}
