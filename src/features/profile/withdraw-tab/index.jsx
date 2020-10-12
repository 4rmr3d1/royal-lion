import React from 'react'
import { FormattedDate } from 'react-intl'
import { Alert } from '@material-ui/lab'
import { TextField, FormControl, useMediaQuery } from '@material-ui/core'
import { Button, Block, BlockItem, Chip } from '@app/ui'
import { useDispatch, useSelector, payment } from '@app/store'

import classes from './style.module.scss'

export const WithdrawTab = () => {
  return (
    <>
      <h3>Вывод средств</h3>

      <BlockItem>
        <WithdrawForm />
      </BlockItem>

      <BlockItem>
        <WithdrawHistory />
      </BlockItem>
    </>
  )
}

export const WithdrawForm = () => {
  const { dispatch } = useDispatch()
  const error = useSelector(state => state.payments.outputError)
  const [amount, setAmount] = React.useState(100)

  const onAmountChange = React.useCallback((e) => {
    setAmount(e.target.value)
  }, [setAmount])

  const onSubmit = React.useCallback((e) => {
    e.preventDefault(e)

    dispatch(payment.paymentOutput({ amount }))
  })

  return (
    <form
      className={classes.form}
      onSubmit={onSubmit}
    >
      <h4>Для вывода средств необходимо пополнить баланс не менее 5 раз</h4>

      <div className="row justify-content-sm-center">
        <div className="col-lg-4 col-sm-5">
          <FormControl fullWidth>
            <TextField
              error={!!error}
              placeholder='Введите сумму'
              value={amount}
              variant='outlined'
              onChange={onAmountChange}
            />
          </FormControl>
        </div>

        <div className="col-lg-4 col-sm-5">
          <FormControl fullWidth>
            <TextField
              placeholder='Номер кошелька/счета'
              variant='outlined'
            />
          </FormControl>
        </div>

        <div className={classes.button}>
          <Button
            color='primary'
            fullWidth
            type='submit'
            variant='big'
          >
            Вывести средства
          </Button>
        </div>
      </div>

      {!!error && (
        <Alert
          severity='error'
          style={{ marginTop: 25 }}
        >
          {error}
        </Alert>
      )}
    </form>
  )
}

const WithdrawHistory = () => {
  return (
    <>
      <Block>
        <h4 className={classes.title}>История заявок</h4>
      </Block>

      <div>
        <Block>
          <WithdrawHistoryItem status={'pending'}/>
        </Block>
      </div>
    </>
  )
}

const WithdrawHistoryItem = ({ status, date }) => {
  const breakPoint = useMediaQuery('(max-width: 575px)')

  return (
    <div className={classes.withdrawHistoryItem}>
      {!breakPoint ? (
        <>
          <div>
            <Chip
              flexBasis={'35%'}
              status={status}
            >
              {status === 'pending' && 'В работе'}
              {status === 'success' && 'Успешно!'}
              {status === 'error' && 'Ошибка'}
            </Chip>

            <h5> 15.08.2020 — 08:34 </h5>
          </div>

          <div>
            <Chip variant='contained'>
            37 829 ₽
            </Chip>

            <Chip variant='outlined'>
            СберБанк 1234 **** **** 6789
            </Chip>
          </div>
        </>
      ) : (
        <>
          <div>
            <Chip
              flexBasis={'35%'}
              status={status}
            >
              {status === 'pending' && 'В работе'}
              {status === 'success' && 'Успешно!'}
              {status === 'error' && 'Ошибка'}
            </Chip>

            <h5>
              <span>
                <FormattedDate
                  hour='2-digit'
                  minute='2-digit'
                  value={new Date()}
                />
              </span>
              <span>
                <FormattedDate
                  day='2-digit'
                  month='short'
                  value={new Date()}
                />
              </span>
            </h5>

            <Chip variant='contained'>
            37 829 ₽
            </Chip>
          </div>

          <div>
            <Chip
              flexBasis={'100%'}
              variant='outlined'
            >
              СберБанк 1234 **** **** 6789
            </Chip>
          </div>
        </>
      )}

    </div>
  )
}
