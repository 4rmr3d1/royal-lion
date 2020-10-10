import React, { useState, useCallback } from 'react'
import { FormattedDate, FormattedTime } from 'react-intl'
import { useMediaQuery, Tooltip, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { useDispatch } from '@app/store'
import cn from 'classnames'

import classes from './style.module.scss'

export const MatchInfoPane = ({ data }) => {
  const xsBreakPoint = useMediaQuery('(min-width: 576px)')

  return (
    <>
      <Accordion key={data.api_id}>
        <AccordionSummary expandIcon={<i className='icon-chevron-down'></i>}>
          {data.name}
        </AccordionSummary>
        <AccordionDetails>
          {data?.matches.map((match, index) => (
            <>
              {xsBreakPoint
                ? (
                  <MatchInfoWide
                    data={match}
                    key={index}
                    tournament={data.name}
                  />
                ) : (
                  <MatchInfoSmall
                    data={match}
                    key={index}
                    tournament={data.name}
                  />
                )
              }
            </>
          ))}
        </AccordionDetails>
      </Accordion>

    </>
  )
}

export const MatchInfoWide = ({ data, tournament }) => {
  const { dispatch } = useDispatch()
  const [show, setShow] = useState(false)

  const onShowCoefClick = useCallback(() => {
    setShow(!show)
  }, [show])

  const onOpen = React.useCallback((eventData) => {
    dispatch({
      type: '@USER/change-property',
      payload: { betModalVisible: true }
    })

    dispatch({
      type: '@BET/on-coefficient-click',
      payload: { data: eventData },
      tournament,
      firstTeam: data.opp_1_name,
      secondTeam: data.opp_2_name
    })
  }, [dispatch])

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
      <div
        className={classes.match}
      >
        <div style={{ maxWidth: 48 }}>
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
        <div className={classes.container}>
          <div style={{ maxWidth: 164 }}>
            <div
              className={classes.command}
              style={{ justifyContent: 'flex-end', marginLeft: 'auto' }}
            >
              <Tooltip title={data?.opp_1_name}>
                <div className={classes.label}>
                  {data?.opp_1_name}
                </div>
              </Tooltip>

              <div
                className={classes.logo}
                style={{ marginLeft: 24 }}
              >
                <img
                  alt=''
                  src={data?.opp_1_icon}
                />
              </div>
            </div>
          </div>

          <div>
            <div className={classes.score}>
              {data?.score_full}
            </div>
          </div>

          <div style={{ maxWidth: 164 }}>
            <div
              className={classes.command}
              style={{ justifyContent: 'flex-start', marginRight: 'auto' }}
            >
              <div
                className={classes.logo}
                style={{ marginRight: 24 }}
              >
                <img
                  alt=''
                  src={data?.opp_2_icon}
                />
              </div>

              <Tooltip title={data?.opp_2_name}>
                <div className={classes.label}>
                  {data?.opp_2_name}
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 403, width: '100%' }}>
          <div className={classes.coefficient}>
            {firstEvents?.map((event, index) =>
              <button
                className="btn-coefficient"
                key={index}
                onClick={() => onOpen(event)}
              >
                <span className="number">
                  {event.oc_rate}
                </span>
              </button>
            )}
          </div>
        </div>
        <span
          className={cn(classes.more, { [classes.active]: show })}
          onClick={onShowCoefClick}
        >
          {show ? 'Скрыть' : `+${hiddenEventsCount} событий`}
        </span>
      </div>
      {show &&
        <div className={classes.matchMore}>
          <div className={classes.matchMoreButtons}>
            {hiddenEvents.map((event, index) =>
              <button
                className="btn-coefficient"
                key={index}
                onClick={() => onOpen(event)}
              >
                <span className={classes.number}>
                  {event.oc_rate}
                </span>
              </button>
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
