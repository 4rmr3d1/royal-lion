import React from 'react'
import cn from 'classnames'
import { useLocation } from 'react-router-dom'
import { DialogTitle, DialogContent, TextField, OutlinedInput } from '@material-ui/core'
import { Dialog, Button, ErrorText, AmountTextMask } from '@app/ui'
import { useSelector, useDispatch, bet } from '@app/store'
import { useNotifications } from '@app/lib/use-notifications'

import classes from './style.module.scss'

export const BetModal = ({ open, onClose }) => {
  const { showSuccessMessage } = useNotifications()
  const { dispatch } = useDispatch()
  const location = useLocation()

  const tournament = useSelector(state => state.bet.tournament)
  const firstTeam = useSelector(state => state.bet.firstTeam)
  const secondTeam = useSelector(state => state.bet.secondTeam)

  const event = useSelector(state => state.bet.data.data?.oc_group_name)
  const coef = useSelector(state => state.bet.data.data?.oc_rate)
  const ocName = useSelector(state => state.bet.data.data?.oc_name)
  const betId = useSelector(state => state.bet.data.data?.id)
  const error = useSelector(state => state.bet.betError)

  const isLoggedIn = useSelector(state => state.authReducer.login.isLoggedIn)

  const [amount, setAmount] = React.useState(50.00)

  const onAmountChange = React.useCallback((e) => {
    setAmount(e.target.value)
  }, [setAmount])

  const onSubmit = React.useCallback((e) => {
    e.preventDefault()

    dispatch(bet.makeBet({
      betType,
      amount,
      betId,
      onSuccess: () => showSuccessMessage('Ваша ставка успешно принята')
    }))
  })

  const betType = React.useMemo(() => {
    switch (location.pathname) {
    case '/':
      return 'line'
    case '/live':
      return 'live'
    default:
      return ''
    }
  }, [location.pathname])

  const possibleAward = React.useMemo(() => {
    return coef ? (amount * coef).toFixed(2) : ''
  }, [amount, coef])

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        disableTypography
        style={{ textAlign: 'center' }}
      >
        <h2>Купон ставки</h2>
      </DialogTitle>

      <DialogContent>
        <div className={cn(classes.gridItem, classes.firstItem)}>
          {!isLoggedIn &&
            <ErrorText
              message='Войдите на сайт, либо пройдите процедуру регистрации'
              style={{ textAlign: 'center', marginBottom: 10 }}
            />
          }

          <div className={cn(classes.formRow, classes.container)}>
            <strong>{tournament}</strong>
          </div>

          <div className={cn(classes.formRow, classes.container)}>
            {firstTeam} - {secondTeam}

            <span
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <span>
                {ocName}
              </span>

              <span className={classes.coef}>
                {event}&nbsp;{coef}
              </span>
            </span>
          </div>
        </div>

        <form
          className={classes.form}
          onSubmit={onSubmit}
        >
          <div className={classes.gridItem}>
            <div className={classes.formRow}>
              <div className={classes.formLabel}>
              Сумма ставки:
              </div>
              <div>
                <OutlinedInput
                  disabled={!isLoggedIn}
                  error={!!error}
                  fullWidth
                  inputComponent={AmountTextMask}
                  value={amount}
                  variant='outlined'
                  onChange={onAmountChange}
                />
              </div>
            </div>

            <ErrorText
              message={error}
              style={{ textAlign: 'center', marginBottom: 10 }}
            />

            <div className={classes.formRow}>
              <div className={classes.formLabel}>
              Тип ставки:
              </div>
              <div>
                <TextField
                  disabled
                  fullWidth
                  value={'Ординар'}
                  variant='outlined'
                />
              </div>
            </div>
            <div className={classes.formRow}>
              <div className={classes.formLabel}>
              Возможный выигрыш:
              </div>
              <div>
                <TextField
                  disabled
                  fullWidth
                  value = {possibleAward}
                  variant='outlined'
                />
              </div>
            </div>
          </div>

          <Button
            color='primary'
            disabled={!isLoggedIn}
            fullWidth
            type='submit'
            variant='big'
          >
            Сделать ставку
          </Button>
        </form>

      </DialogContent>
    </Dialog>
  )
}
