import React from 'react'
import { FormattedTime, FormattedDate } from 'react-intl'
import { useMediaQuery } from '@material-ui/core'
import { Block, Chip } from '@app/ui'
import { bet, useDispatch, useSelector } from '@app/store'

import classes from './style.module.scss'

export const BetHistoryTab = () => {
  const { dispatch } = useDispatch()
  const breakPoint = useMediaQuery('(max-width: 575px)')
  console.log(breakPoint)

  const history = useSelector(state => state.bet.betHistory)

  React.useEffect(() => {
    dispatch(bet.getBets())
  }, [])

  return (
    <>
      <h3>История ставок</h3>

      <Block>
        <h4 className={classes.title}>Результаты</h4>
      </Block>

      <Block>
        {history?.map((match, index) =>
          <HistoryItem
            data={match}
            key={index}
          />
        )}
      </Block>
    </>
  )
}

// Bets api doesn't work at this moment

const HistoryItem = ({ data }) => {
  return (
    <div
      className={classes.historyItem}
    >

      <Chip variant='muted'>
        {data.bet_code}
      </Chip>

      <div className={classes.historyItemDate}>
        <div>
          <FormattedDate value={data.date_created}/>
        </div>

        <div>
          <FormattedTime value={data.date_created}/>
        </div>
      </div>

      <div className={classes.historyItemResult}>
        <h5></h5>

        <div>
          <h6>
          </h6>
        </div>
      </div>

      <Chip variant='outlined'>
        {data.user_win} ₽
      </Chip>

      <Chip variant='contained'>
        {data.win_coefficient}
      </Chip>

    </div>
  )
}
