import React from 'react'
import { TextField, FormControl } from '@material-ui/core'
import { Button, Block, BlockItem, Chip } from '@app/ui'

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
  return (
    <form className={classes.form}>
      <h4>Для вывода средств необходимо пополнить баланс не менее 5 раз</h4>

      <div className="row">
        <div className="col-lg-4">
          <FormControl>
            <TextField
              placeholder='Введите сумму'
              variant='outlined'
            />
          </FormControl>
        </div>

        <div className="col-lg-4">
          <FormControl>
            <TextField
              placeholder='Номер кошелька/счета'
              variant='outlined'
            />
          </FormControl>
        </div>

        <Button
          type='submit'
          variant='big'
        >
          Вывести средства
        </Button>
      </div>
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
          <WithdrawHistoryItem status={'success'}/>
          <WithdrawHistoryItem status={'error'}/>
        </Block>
      </div>
    </>
  )
}

const WithdrawHistoryItem = ({ status, date }) => {
  return (
    <div className={classes.withdrawHistoryItem}>
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
    </div>
  )
}
