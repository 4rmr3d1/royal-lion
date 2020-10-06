import React from 'react'
import { TextField, FormControl } from '@material-ui/core'
import { Button } from '@app/ui'

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
  return (
    <>
      <form className={classes.form}>
        <div className="form-row row">
          <div className="col-lg-4 col-12">
            <FormControl fullWidth>
              <TextField variant='outlined'/>
            </FormControl>
          </div>
          <div className="col-lg-4 col-12">
            <Button fullWidth variant='big'>
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
