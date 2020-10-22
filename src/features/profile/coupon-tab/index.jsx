import React from 'react'
import { TextField, FormControl } from '@material-ui/core'
import { Button, ErrorText } from '@app/ui'
import { useDispatch, useSelector, bet } from '@app/store'

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
  const serverError = useSelector(state => state.bet.couponError)
  const couponData = useSelector(state => state.bet.coupon)

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
                error={!!serverError}
                value={ticket}
                variant='outlined'
                onChange={onTicketChange}
              />
            </FormControl>
            <ErrorText message={serverError}/>
          </div>
          <div className="col-lg-4 col-12">
            <Button
              color='primary'
              fullWidth
              type='submit'
              variant='big'
            >
              проверить купон
            </Button>
          </div>
        </div>
      </form>

      {couponData &&
        <div className={classes.couponStatus}>
          <span>Статус купона:&nbsp;
            <strong>{couponData.bet_type === 'live' && couponData.is_went === null && 'В игре' }</strong>
            <strong>{couponData.bet_type === 'line' && couponData.is_went === null && 'В линии' }</strong>
            <strong>{couponData.is_went === true && couponData.returned === false && 'Рассчитан'}</strong>
            <strong>{couponData.is_went === false && couponData.returned === false && 'Проигрыш'}</strong>
            <strong>{couponData.returned === true && 'Отменен'}</strong>
          </span>
          <div>
            <span>
              {couponData.is_went === true ? couponData.user_win : couponData.user_bet} ₽
            </span>
          </div>
        </div>
      }
    </>
  )
}

const BetHistory = () => {
  return (
    <>
    </>
  )
}
