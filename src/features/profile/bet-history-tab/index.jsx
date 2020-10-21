import React from 'react'
import cn from 'classnames'
import { FormattedTime, FormattedDate } from 'react-intl'
import { useMediaQuery } from '@material-ui/core'
import { FiberManualRecord, History, Forward } from '@material-ui/icons'
import { Block, Chip } from '@app/ui'
import { bet, useDispatch, useSelector } from '@app/store'

import classes from './style.module.scss'

export const BetHistoryTab = () => {
  const { dispatch } = useDispatch()

  const history = useSelector(state => state.bet.betHistory)

  React.useEffect(() => {
    dispatch(bet.getBets())
  }, [dispatch])

  const liveBets = React.useMemo(() => {
    return history?.filter(bet => bet.bet_type === 'live' && bet.is_went === null)
  }, [history])

  const lineBets = React.useMemo(() => {
    return history?.filter(bet => bet.bet_type === 'line' && bet.is_went === null)
  }, [history])

  const archiveBets = React.useMemo(() => {
    return history?.filter(bet => bet.is_went !== null)
  }, [history])

  return (
    <>
      <h3>История ставок</h3>

      <Block>
        <h4 className={classes.title}>
          <i className='iconAward'></i>
          Результаты
        </h4>
      </Block>

      {liveBets?.length > 0 &&
        <div className={classes.betBlock}>
          <span className={classes.live}>
            <FiberManualRecord style={{ fontSize: 6, marginRight: 10 }}/> В игре
          </span>
          <Block>
            {liveBets?.map((match, index) =>
              <HistoryItem
                data={match}
                key={index}
              />
            )}
          </Block>
        </div>
      }

      {lineBets?.length > 0 &&
        <div className={classes.betBlock}>
          <span className={classes.line}>
            <Forward style={{ fontSize: 20, marginRight: 10 }}/> Будущие матчи
          </span>
          <Block>
            {lineBets?.map((match, index) =>
              <HistoryItem
                data={match}
                key={index}
              />
            )}
          </Block>
        </div>
      }

      {archiveBets?.length > 0 &&
        <div className={classes.betBlock}>
          <span className={classes.archive}>
            <History style={{ fontSize: 20, marginRight: 10 }}/> архив
          </span>
          <Block>
            {archiveBets?.map((match, index) =>
              <HistoryItem
                data={match}
                key={index}
              />
            )}
          </Block>
        </div>
      }

    </>
  )
}

const HistoryItem = ({ data }) => {
  const breakPoint = useMediaQuery('(max-width: 575px)')

  const event = React.useMemo(() => {
    return data.events?.map(event => event)[0] || null
  }, [data])

  const matchMap = React.useMemo(() => {
    return data.events?.map(event => event.match_list).map(match => match[0]) || null
  }, [data])

  const match = React.useMemo(() => {
    return matchMap[0] || null
  }, [matchMap])

  const splitScore = React.useMemo(() => {
    return match?.score_full.split(':') || ''
  }, [match])

  return (
    <div className={classes.historyItem}>
      <span
        className={cn(
          classes.condition,
          { [classes.win]: data?.is_went === true },
          { [classes.lose]: data?.is_went === false },
          { [classes.returned]: data?.returned === true }
        )}
      ></span>

      {!breakPoint ? (
        <>
          <div style={{ width: 80 }}>
            <Chip
              padding='12px 10px'
              variant='muted'
            >
              {data?.bet_code}
            </Chip>
          </div>

          <div className={classes.historyItemDate}>
            <div>
              <FormattedDate value={data?.date_created}/>
            </div>

            <div>
              <FormattedTime value={data?.date_created}/>
            </div>
          </div>

          <div className={classes.historyItemResult}>
            <h5>
              {match?.tournament.name}
            </h5>
            <div>
              <h6>
                {match?.opp_1_name}&nbsp;
                <span>({splitScore[0]})—({splitScore[0]})</span>
                &nbsp;{match?.opp_2_name}
              </h6>
            </div>
          </div>

          <div style={{ width: 90 }}>
            <Chip
              padding='5px 12px'
              style={{ justifyContent: 'flex-start' }}
              variant={data?.is_went === true ? 'contained' : 'outlined'}
            >
              <div className={classes.valueLabel}>
                <div style={{ fontWeight: '400', fontSize: 10 }}>
                  Ставка:
                </div>

                <div>
                  {data?.user_bet} ₽
                </div>
              </div>
            </Chip>
          </div>

          <div style={{ width: 185 }}>
            {data?.is_went === true ? (
              <div className={classes.winChip}>
                <div className={classes.winChipContainer}>
                  <div className={classes.valueLabel}>
                    <div style={{ fontWeight: '400', fontSize: 10 }}>
                    Выигрыш:
                    </div>

                    <div style={{ fontWeight: '500', fontSize: 12 }}>
                      {data?.user_win} ₽
                    </div>
                  </div>

                  <div style={{ fontWeight: '500', fontSize: 12 }}>
                    {event?.short_name}&nbsp;{data?.win_coefficient}
                  </div>
                </div>
              </div>
            ) : (
              <Chip variant='outlined'>
                {event?.short_name}&nbsp;{data?.win_coefficient}
              </Chip>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={classes.match}>
            <div className={classes.time}>
              <span>
                <FormattedTime value={data?.date_created}/>
              </span>

              <span>
                <FormattedDate
                  day='2-digit'
                  month='short'
                  value={data?.date_created}
                />
              </span>
            </div>

            <div className={classes.teams}>
              <div className={classes.team}>
                <img
                  alt=""
                  src={match?.opp_1_icon}
                />
                <span>
                  {match?.opp_1_name}
                </span>
              </div>

              <div className={classes.team}>
                <img
                  alt=""
                  src={match?.opp_2_icon}
                />
                <span>
                  {match?.opp_2_name}
                </span>
              </div>
            </div>

            <div className={classes.score}>
              <span>
                {splitScore[0] || ''}
              </span>
              <span>
                {splitScore[1] || ''}
              </span>
            </div>
          </div>

          <div className={classes.event}>
            <div>
              <Chip variant='muted'>
                {data?.bet_code}
              </Chip>

              <Chip variant='outlined'>
                {data?.user_win} ₽
              </Chip>
            </div>

            <div>
              {data?.is_went === true ? (
                <div className={classes.winChip}>
                  <div className={classes.winChipContainer}>
                    <div className={classes.valueLabel}>
                      <div style={{ fontWeight: '400', fontSize: 10 }}>
                    Выигрыш:
                      </div>

                      <div style={{ fontWeight: '500', fontSize: 12 }}>
                        {data?.user_win} ₽
                      </div>
                    </div>

                    <div style={{ fontWeight: '500', fontSize: 12 }}>
                      {event?.short_name}&nbsp;{data?.win_coefficient}
                    </div>
                  </div>
                </div>
              ) : (
                <Chip variant='outlined'>
                  {event?.short_name}&nbsp;{data?.win_coefficient}
                </Chip>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
