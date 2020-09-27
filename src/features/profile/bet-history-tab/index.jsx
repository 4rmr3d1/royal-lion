import React from 'react'
import { Block, Chip } from '@app/ui'

import classes from './style.module.scss'

export const BetHistoryTab = () => {
  return (
    <>
      <h3>История ставок</h3>

      <Block>
        <h4 className={classes.title}>Результаты</h4>
      </Block>

      <Block>
        <HistoryItem/>
        <HistoryItem/>
        <HistoryItem/>
        <HistoryItem/>
      </Block>
    </>
  )
}

// #TODO: endpoint

const HistoryItem = () => {
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
