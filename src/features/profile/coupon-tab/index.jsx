import React from 'react'
import { TextField, FormControl } from '@material-ui/core'
import { Button } from '@app/ui'
import { useDispatch, bet } from '@app/store'

import classes from './style.module.scss'

export const CouponTab = () => {
  return (
    <>
      <h3>Проверка по номеру купона</h3>

      <CheckCoupon />

      <BetHistory />
    </>
  )
}

const CheckCoupon = () => {
  const { dispatch } = useDispatch()

  const [ticket, setTicket] = React.useState('')

  const onTicketChange = React.useCallback((e) => {
    setTicket(e.target.value)
  }, [setTicket])

  const onSubmit = React.useCallback((e) => {
    e.preventDefault()

    dispatch(bet.checkBetCoupon({ ticket }))
  }, [dispatch, ticket])

  return (
    <>
      <form
        className={classes.form}
        onSubmit={onSubmit}
      >
        <div className="form-row row">
          <div className="col-lg-4 col-12">
            <FormControl fullWidth>
              <TextField
                value={ticket}
                variant='outlined'
                onChange={onTicketChange}
              />
            </FormControl>
          </div>
          <div className="col-lg-4 col-12">
            <Button
              fullWidth
              variant='big'
            >
              проверить купон
            </Button>
          </div>
        </div>
      </form>

      <div className={classes.couponStatus}>
        <span>Статус купона: <strong>В игре </strong> </span>
        <div>
          <span>37 829 ₽</span>
        </div>
      </div>
    </>
  )
}

const BetHistory = () => {
  return (
    <>
    </>
  )
}
