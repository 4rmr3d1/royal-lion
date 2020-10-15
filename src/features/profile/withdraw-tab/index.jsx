import React from 'react'
import { FormattedDate, FormattedTime } from 'react-intl'
import { Alert } from '@material-ui/lab'
import { TextField, FormControl, useMediaQuery, Select, MenuItem } from '@material-ui/core'
import { useNotifications } from '@app/lib'
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
  const { showSuccessMessage } = useNotifications()

  const error = useSelector(state => state.payments.outputError)

  const [amount, setAmount] = React.useState(100)
  const [paymentMethod, setPaymentMethod] = React.useState(0)

  const onAmountChange = React.useCallback((e) => {
    setAmount(e.target.value)
  }, [setAmount])

  const onSubmit = React.useCallback((e) => {
    e.preventDefault(e)

    dispatch(payment.paymentOutput({ amount, onSuccess: () => showSuccessMessage('Заявка на вывод успешно создана') }))
  })

  return (
    <form
      className={classes.form}
      onSubmit={onSubmit}
    >
      <h4>Для вывода средств необходимо пополнить баланс не менее 5 раз</h4>

      {!!error && (
        <Alert
          severity='error'
          style={{ marginBottom: 25 }}
        >
          {error}
        </Alert>
      )}

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

        <div className="col-lg-4 col-sm-5">
          <FormControl
            fullWidth
            variant='outlined'
          >
            <Select
              name='gender'
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
            >
              <MenuItem
                style={{ display: 'none' }}
                value={'0'}
              >
                Способ вывода
              </MenuItem>
              <MenuItem value={'Visa RUB'}>Visa RUB</MenuItem>
              <MenuItem value={'QIWI WALLET'}>QIWI WALLET</MenuItem>
              <MenuItem value={'VISA USA'}>VISA USA</MenuItem>
              <MenuItem value={'VISA EUR'}>VISA EUR</MenuItem>
              <MenuItem value={'TETHER USD'}>TETHER USD</MenuItem>
              <MenuItem value={'EXMO USD'}>EXMO USD</MenuItem>
              <MenuItem value={'LITECOIN'}>LITECOIN</MenuItem>
              <MenuItem value={'BITCOIN CASH'}>BITCOIN CASH</MenuItem>
              <MenuItem value={'MONERO'}>MONERO</MenuItem>
              <MenuItem value={'BITCOIN'}>BITCOIN</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div
          className={classes.button}
          style={{ marginTop: 20 }}
        >
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
    </form>
  )
}

const WithdrawHistory = () => {
  const { dispatch } = useDispatch()

  const outputRequests = useSelector(state => state.payments?.outputRequests)

  React.useEffect(() => {
    dispatch(payment.getPaymentsOutput())
  }, [dispatch])

  return (
    <>
      <Block>
        <h4 className={classes.title}>История заявок</h4>
      </Block>

      {outputRequests?.map((request, index) =>
        <div key={index}>
          <Block>
            <WithdrawHistoryItem
              data={request}
              status={request.accepted}
            />
          </Block>
        </div>
      )}
    </>
  )
}

export const WithdrawHistoryItem = ({ status, data }) => {
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
              {status === null && 'В работе'}
              {status === true && 'Успешно!'}
              {status === false && 'Ошибка'}
            </Chip>

            <h5>
              <FormattedDate value={data.date_created}/>
              &nbsp;-&nbsp;
              <FormattedTime value={data.date_created}/>
            </h5>
          </div>

          <div>
            <Chip variant='contained'>
              {data.amount}₽
            </Chip>

            {/* <Chip variant='outlined'>
            СберБанк 1234 **** **** 6789
            </Chip> */}
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
