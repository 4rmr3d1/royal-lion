import React from 'react'
import { FormattedTime, FormattedDate } from 'react-intl'
import { TextField, useMediaQuery } from '@material-ui/core'
import { Button, Block, BlockItem, ErrorText, Chip } from '@app/ui'
import { useDispatch, useSelector, payment } from '@app/store'

import classes from './style.module.scss'

export const ProfileTab = () => {
  const { dispatch } = useDispatch()

  const error = useSelector(state => state.payments?.inputError)
  const inputRequests = useSelector(state => state.payments?.inputRequests)

  const [amount, setAmount] = React.useState(500)

  const onAmountChange = React.useCallback((e) => {
    setAmount(e.target.value)
  }, [setAmount])

  const onSubmit = React.useCallback((e) => {
    e.preventDefault(e)

    dispatch(payment.paymentsInput({ amount }))
  })

  React.useEffect(() => {
    dispatch(payment.getPaymentsInput())
  }, [])

  return (
    <>
      <h3>Пополнение баланса</h3>
      <BlockItem>
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

              <ErrorText message={error}/>
            </div>
          </div>

          <div className={classes.paymentMethods}>
            <div className={classes.paymentMethod}>
              <Block>
                <div className={classes.card}>
                  <img
                    alt=''
                    src='./img/qiwi.png'
                  />
                  <Button
                    color='primary'
                    fullWidth
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
                    fullWidth
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
      </BlockItem>

      <BlockItem>
        <div className={classes.inputs}>
          <Block>
            <h4 className={classes.title}>
              История пополнения
            </h4>
          </Block>

          {inputRequests?.map((request, index) =>
            <div key={index}>
              <Block>
                <WithdrawHistoryItem
                  data={request}
                  status={request.accepted}
                />
              </Block>
            </div>
          )}
        </div>
      </BlockItem>
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
          </div>
        </>
      ) : (
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
              <span>
                <FormattedTime value={data.date_created}/>
              </span>
              <span>
                <FormattedDate
                  day='2-digit'
                  month='short'
                  value={data.date_created}
                />
              </span>
            </h5>

            <Chip variant='contained'>
              {data.amount}₽
            </Chip>
          </div>
        </>
      )}
    </div>
  )
}
