import React, { useState, useCallback } from 'react'
import { FormattedDate, FormattedTime } from 'react-intl'
import { useMediaQuery, Tooltip, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { useDispatch } from '@app/store'
import cn from 'classnames'

import classes from './style.module.scss'

export const MatchInfoPane = ({ data }) => {
  return (
    <React.Fragment>
      <Accordion
        defaultExpanded
        key={data.api_id}
      >
        <AccordionSummary expandIcon={<i className='icon-chevron-down'></i>}>
          {data.name}
        </AccordionSummary>
        <AccordionDetails>
          {data?.matches.map((match, index) => (
            <MatchInfo
              data={match}
              key={index}
              tournament={data.name}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}

export const MatchInfo = ({ data, tournament }) => {
  const { dispatch } = useDispatch()
  const xsBreakPoint = useMediaQuery('(min-width: 576px)')

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

  const advantage = React.useMemo(() => {
    return data.additional_events.filter(event => event.oc_group_name === 'Фора')
  }, [data.additional_events])

  const doubleChance = React.useMemo(() => {
    return data.additional_events.filter(event => event.oc_group_name === 'Двойной шанс')
  }, [data.additional_events])

  const individualTotal = React.useMemo(() => {
    return data.additional_events.filter(
      event => event.oc_group_name === 'Индивидуальный тотал 1-го' ||
      event.oc_group_name === 'Индивидуальный тотал 2-го'
    )
  }, [data.additional_events])

  const bothScore = React.useMemo(() => {
    return data.additional_events.filter(event => event.oc_group_name === 'Обе забьют')
  }, [data.additional_events])
  const splitScore = React.useMemo(() => {
    return data?.score_full.split(':')
  }, [data])

  return (
    <>
      {xsBreakPoint
        ? (
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
                  {data.main_events?.map((event, index) =>
                    <button
                      className={cn(classes.btnCoefficient,
                        { [classes.up]: event.last_changed === 1 },
                        { [classes.down]: event.last_changed === -1 }
                      )}
                      key={index}
                      onClick={() => onOpen(event)}
                    >
                      <span className={classes.number}>
                        {event.short_name}&nbsp;
                        <span className={classes.rate}>
                          {event.oc_rate}
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <span
                className={cn(classes.more, { [classes.active]: show })}
                onClick={onShowCoefClick}
              >
                {show ? 'Скрыть' : `+${data.additional_events.length} событий`}
              </span>
            </div>
            {show &&
          <div className={classes.matchMore}>
            <div className={classes.matchMoreButtons}>

              {advantage.length > 0 &&
                <>
                  <div className={classes.eventType}>
                    <span>
                      Фора
                    </span>
                    <div>
                      {advantage.map((event, index) =>
                        <button
                          className={cn(classes.btnCoefficient,
                            { [classes.up]: event.last_changed === 1 },
                            { [classes.down]: event.last_changed === -1 }
                          )}
                          key={index}
                          onClick={() => onOpen(event)}
                        >
                          <span className={classes.number}>
                            {event.short_name}&nbsp;
                            <span className={classes.rate}>
                              {event.oc_rate}
                            </span>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              }

              {individualTotal.length > 0 &&
                <>
                  <div className={classes.eventType}>
                    <span>
                      Индивидуальный тотал
                    </span>
                    <div>
                      {individualTotal.map((event, index) =>
                        <button
                          className={cn(classes.btnCoefficient,
                            { [classes.up]: event.last_changed === 1 },
                            { [classes.down]: event.last_changed === -1 }
                          )}
                          key={index}
                          onClick={() => onOpen(event)}
                        >
                          <span className={classes.number}>
                            {event.short_name}&nbsp;
                            <span className={classes.rate}>
                              {event.oc_rate}
                            </span>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              }

              {bothScore.length > 0 &&
                <>
                  <div className={classes.eventType}>
                    <span>
                      Обе забьют
                    </span>
                    <div>
                      {bothScore.map((event, index) =>
                        <button
                          className={cn(classes.btnCoefficient,
                            { [classes.up]: event.last_changed === 1 },
                            { [classes.down]: event.last_changed === -1 }
                          )}
                          key={index}
                          onClick={() => onOpen(event)}
                        >
                          <span className={classes.number}>
                            {event.short_name}&nbsp;
                            <span className={classes.rate}>
                              {event.oc_rate}
                            </span>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              }

              {doubleChance.length > 0 &&
                <>
                  <div className={classes.eventType}>
                    <span>
                    Двойной шанс
                    </span>
                    <div>
                      {doubleChance.map((event, index) =>
                        <button
                          className={cn(classes.btnCoefficient,
                            { [classes.up]: event.last_changed === 1 },
                            { [classes.down]: event.last_changed === -1 }
                          )}
                          key={index}
                          onClick={() => onOpen(event)}
                        >
                          <span className={classes.number}>
                            {event.short_name}&nbsp;
                            <span className={classes.rate}>
                              {event.oc_rate}
                            </span>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              }

            </div>
          </div>
            }
          </>
        ) : (
          <>
            <div className={classes.match}>
              <div style={{ width: 40 }}>
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
              <div style={{ width: 145 }}>
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
              <div style={{ width: 25 }}>
                <div className={classes.score}>
                  <div>{ splitScore[0] }</div>
                  <div>{ splitScore[1] }</div>
                </div>
              </div>
            </div>
            <div className={classes.coefficient}>
              {data.main_events?.map((event, index) =>
                <button
                  className="btn-coefficient"
                  key={index}
                  onClick={() => onOpen(event)}
                >
                  <span className="number">
                    {event.short_name}&nbsp;{event.oc_rate}
                  </span>
                </button>
              )}
              <span
                className={cn(classes.more, { [classes.active]: show })}
                onClick={onShowCoefClick}
              >
                {show ? 'Скрыть' : `Ещё +${data.additional_events.length}`}
              </span>
            </div>
            {show &&
              <div className={classes.matchMore}>
                <div className={classes.matchMoreButtons}>

                  {advantage.length > 0 &&
                    <>
                      <div className={classes.eventType}>
                        <span>
                          Фора
                        </span>
                        <div>
                          {advantage.map((event, index) =>
                            <button
                              className="btn-coefficient"
                              key={index}
                              onClick={() => onOpen(event)}
                            >
                              <span className={classes.number}>
                                {event.short_name}&nbsp;{event.oc_rate}
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  }

                  {individualTotal.length > 0 &&
                    <>
                      <div className={classes.eventType}>
                        <span>
                          Индивидуальный тотал
                        </span>
                        <div>
                          {individualTotal.map((event, index) =>
                            <button
                              className="btn-coefficient"
                              key={index}
                              onClick={() => onOpen(event)}
                            >
                              <span className={classes.number}>
                                {event.short_name}&nbsp;{event.oc_rate}
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  }

                  {bothScore.length > 0 &&
                    <>
                      <div className={classes.eventType}>
                        <span>
                          Обе забьют
                        </span>
                        <div>
                          {bothScore.map((event, index) =>
                            <button
                              className="btn-coefficient"
                              key={index}
                              onClick={() => onOpen(event)}
                            >
                              <span className={classes.number}>
                                {event.short_name}&nbsp;{event.oc_rate}
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  }

                  {doubleChance.length > 0 &&
                    <>
                      <div className={classes.eventType}>
                        <span>
                        Двойной шанс
                        </span>
                        <div>
                          {doubleChance.map((event, index) =>
                            <button
                              className="btn-coefficient"
                              key={index}
                              onClick={() => onOpen(event)}
                            >
                              <span className={classes.number}>
                                {event.short_name}&nbsp;{event.oc_rate}
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  }

                </div>
              </div>
            }
          </>
        )}

    </>
  )
}
