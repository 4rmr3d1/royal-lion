import React, { useState, useCallback } from 'react'
import { FormattedDate, FormattedTime } from 'react-intl'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import cn from 'classnames'

import classes from './style.module.scss'

export const MatchInfo = ({ data }) => {
  const xsBreakPoint = useMediaQuery('(min-width: 576px)')

  return (
    <>
      {xsBreakPoint
        ? <MatchInfoWide data={data}/>
        : <MatchInfoSmall data={data}/>
      }
    </>
  )
}

export const MatchInfoWide = ({ data }) => {
  const [show, setShow] = useState(false)

  const onShowCoefClick = useCallback(() => {
    setShow(!show)
  }, [show])

  const firstEvents = React.useMemo(() => {
    return data?.events.slice(0, 6)
  }, [data])

  const hiddenEvents = React.useMemo(() => {
    return data?.events.slice(6)
  }, [data])

  const hiddenEventsCount = React.useMemo(() => {
    return data?.events.length - 6
  }, [data])

  return (
    <>
      <div className={classes.match}>
        <div style={{ width: '8%' }}>
          <div className={classes.time}>
            <FormattedTime value={data?.game_start} />
          </div>
          <div className={classes.date}>
            <FormattedDate
              day='2-digit'
              month='short'
              value={data?.game_start}
            />
          </div>
        </div>
        <div style={{ width: '15%' }}>
          <div
            className={classes.command}
            style={{ justifyContent: 'flex-end', marginLeft: 'auto' }}
          >
            <div
              className={classes.label}
            >
              {data?.opp_1_name}
            </div>
            <div
              className={classes.logo}
              style={{ marginLeft: 20 }}
            >
              <img
                alt=''
                src={data?.opp_1_icon}
              />
            </div>
          </div>
        </div>
        <div style={{ width: '2%' }}>
          <div className={classes.score}>
            {data?.score_full}
          </div>
        </div>
        <div style={{ width: '15%' }}>
          <div
            className={classes.command}
            style={{ justifyContent: 'flex-start', marginRight: 'auto' }}
          >
            <div
              className={classes.logo}
              style={{ marginRight: 20 }}
            >
              <img
                alt=''
                src={data?.opp_2_icon}
              />
            </div>
            <div
              className={classes.label}
            >
              {data?.opp_2_name}
            </div>
          </div>
        </div>
        <div style={{ width: '48%' }}>
          <div className={classes.coefficient}>
            {firstEvents?.map((event, index) =>
              <Link
                className="btn-coefficient"
                key={index}
              >
                <span className="number">
                  {event.oc_rate}
                </span>
              </Link>
            )}
            <span
              className={cn(classes.more, { [classes.active]: show })}
              onClick={onShowCoefClick}
            >
              {show ? 'Скрыть' : `+${hiddenEventsCount} событий`}
            </span>
          </div>
        </div>
      </div>
      {show &&
        <div>
          <div className={classes.matchMore}>
            {hiddenEvents.map((event, index) =>
              <div
                className={classes.item}
                key={index}
              >
                <div
                  className={classes.matchMoreButtons}
                >
                  <Link className="btn-coefficient">
                    <span className={classes.number}>
                      {event.oc_rate}
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      }
    </>
  )
}

export const MatchInfoSmall = ({ data }) => {
  return (
    <div className={classes.match}>
      <div style={{ width: '20%' }}>
        <div className={classes.time}>
          <FormattedTime value={data?.game_start} />
        </div>
        <div className={classes.date}>
          <FormattedDate
            day='2-digit'
            month='short'
            value={data?.game_start}
          />
        </div>
      </div>
      <div style={{ width: '60%' }}>
        <div className={classes.command}>
          <div
            className={classes.logo}
            style={{ marginRight: 7 }}
          >
            <img
              alt=''
              src={data?.opp_1_icon}
            />
          </div>
          <div className={classes.label}>
            {data?.opp_1_name}
          </div>
        </div>

        <div className={classes.command}>
          <div
            className={classes.logo}
            style={{ marginRight: 7 }}
          >
            <img
              alt=''
              src={data?.opp_2_icon}
            />
          </div>
          <div className={classes.label}>
            {data?.opp_2_name}
          </div>
        </div>
      </div>
      <div style={{ width: '10%' }}>
        <div className={classes.score}>
          {data?.score_full}
        </div>
      </div>
    </div>
  )
}
