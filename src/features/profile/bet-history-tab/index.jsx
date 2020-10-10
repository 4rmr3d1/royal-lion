import React from 'react'
import { useMediaQuery } from '@material-ui/core'
import { Block, Chip, MatchInfoSmall } from '@app/ui'
import { bet, useDispatch } from '@app/store'

import classes from './style.module.scss'

export const BetHistoryTab = () => {
  const { dispatch } = useDispatch()
  const breakPoint = useMediaQuery('(max-width: 575px)')

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
        {breakPoint ? <MatchInfoSmall/> : <HistoryItem/> }
      </Block>
    </>
  )
}

// Bets api doesn't work at this moment

const HistoryItem = ({ data }) => {
  return (
    <div className={classes.historyItem}>

      <Chip variant='muted'>
        №0000001
      </Chip>

      <div className={classes.historyItemDate}>
        <div>15.08.2020</div>
        <div>08:34</div>
      </div>

      <div className={classes.historyItemResult}>
        <h5>Short Football 4x4 L2</h5>

        <div>
          <h6>
            Барселона <span>(2)—(1)</span> Манчестер Юнайтед
          </h6>
        </div>
      </div>

      <Chip variant='outlined'>
        37 829 ₽
      </Chip>

      <Chip variant='contained'>
        2x 2.37
      </Chip>

    </div>
  )
}
