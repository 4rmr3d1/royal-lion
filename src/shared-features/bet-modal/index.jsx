import React from 'react'
import cn from 'classnames'
import { DialogTitle, DialogContent, TextField } from '@material-ui/core'
import { Dialog, Button } from '@app/ui'
import { useSelector, useDispatch, bet } from '@app/store'

import classes from './style.module.scss'

export const BetModal = ({ open, onClose }) => {
  const { dispatch } = useDispatch()

  const tournament = useSelector(state => state.bet.tournament)
  const firstTeam = useSelector(state => state.bet.firstTeam)
  const secondTeam = useSelector(state => state.bet.secondTeam)
  const event = useSelector(state => state.bet.data.data?.oc_group_name)
  const coef = useSelector(state => state.bet.data.data?.oc_rate)
  const betId = useSelector(state => state.bet.data.data?.id)

  const [amount, setAmount] = React.useState(50)

  const onAmountChange = React.useCallback((e) => {
    setAmount(e.target.value)
  }, [setAmount])

  const onSubmit = React.useCallback((e) => {
    e.preventDefault()

    dispatch(bet.makeBet({ betType: 'live', amount, betId }))
  })

  const possibleAward = React.useMemo(() => {
    return coef ? amount * coef : ''
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
        <div className={classes.gridItem}>
          <div className={cn(classes.formRow, classes.container)}>
            <strong>{tournament}</strong>
          </div>

          <div className={cn(classes.formRow, classes.container)}>
            {firstTeam} - {secondTeam}

            <span className={classes.coef}>
              {event}&nbsp;{coef}
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
                <TextField
                  fullWidth
                  value={amount}
                  variant='outlined'
                  onChange={onAmountChange}
                />
              </div>
            </div>
            <div className={classes.formRow}>
              <div className={classes.formLabel}>
              Тип ставки:
              </div>
              <div>
                <TextField
                  disabled
                  fullWidth
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
