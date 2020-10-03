import React, { useState, useCallback } from 'react'
import { FormattedDate, FormattedTime } from 'react-intl'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import classes from './style.module.scss'

export const MatchInfo = ({ data }) => {
  const [show, setShow] = useState(false)

  const onShowCoefClick = useCallback(() => {
    setShow(!show)
  }, [show])

  return (
    <div className={`row ${classes.match}`}>
      <div style={{ width: '8%' }}>
        <div className={classes.time}>
          <FormattedTime value={data?.game_num} />
        </div>
        <div className={classes.date}>
          <FormattedDate
            day='2-digit'
            month='short'
            value={data?.game_num}
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
          <Link className="btn-coefficient">
          1x <span className="number"></span>
          </Link>
          <Link className="btn-coefficient">
          x <span className="number"></span>
          </Link>
          <Link className="btn-coefficient">
          x <span className="number"></span>
          </Link>
          <Link className="btn-coefficient">
          Б <span className="number"></span>
          </Link>
          <Link className="btn-coefficient">
          Т <span className="number"></span>
          </Link>
          <Link className="btn-coefficient">
          М <span className="number"></span>
          </Link>
          { show ? (
            <span
              className={cn(classes.more, classes.active)}
              onClick={onShowCoefClick}
            >
              Скрыть
            </span>
          ) : (
            <span
              className={classes.more}
              onClick={onShowCoefClick}
            >
              +16 событий
            </span>
          ) }

        </div>
      </div>
      { show
        ? <MatchInfoMore/>
        : null }
    </div>
  )
}

const MatchInfoMore = ({
  cf1,
  cf2,
  cf3,
  cf4,
  cf5,
  cf6
}) => {
  return (
    <div className="col-12">
      <div className={classes.matchMore}>
        <div className={classes.item}>
          <div className={classes.title}>
            Исход
          </div>
          <div className={classes.matchMoreButtons}>
            <Link className="btn-coefficient">1x <span className="number">{cf1}</span></Link>
            <Link className="btn-coefficient">x <span className="number">{cf2}</span></Link>
            <Link className="btn-coefficient">2x <span className="number">{cf3}</span></Link>
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.title}>
            Двойной исход
          </div>
          <div className={classes.matchMoreButtons}>
            <Link className="btn-coefficient">1x <span className="number">{cf1}</span></Link>
            <Link className="btn-coefficient">12 <span className="number">{cf2}</span></Link>
            <Link className="btn-coefficient">2x <span className="number">{cf3}</span></Link>
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.title}>
            Фора
          </div>
          <div className={classes.matchMoreButtons}>
            <Link className="btn-coefficient">1 (-4.5) <span className="number">{cf4}</span></Link>
            <Link className="btn-coefficient">2 (4.5) <span className="number">{cf5}</span></Link>
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.title}>
            Точный счёт
          </div>
          <div className={classes.matchMoreButtons}>
            <Link className="btn-coefficient">0—2 <span className="number">{cf4}</span></Link>
            <Link className="btn-coefficient">1—2 <span className="number">{cf5}</span></Link>
            <Link className="btn-coefficient">2—0 <span className="number">{cf6}</span></Link>
            <Link className="btn-coefficient">2—1 <span className="number">{cf6}</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
