import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import classes from './style.module.scss'

export const MatchInfo = ({
  date,
  team1,
  team2,
  cf1,
  cf2,
  cf3,
  cf4,
  cf5,
  cf6
}) => {
  const [show, setShow] = useState(false)
  const onShowCoefClick = useCallback(() => {
    setShow(!show)
  }, [show])
  return (
    <div className={`row ${classes.match}`}>
      <div className='col-lg-1'>
        <div className={classes.time}>23:30</div>
        <div className={classes.date}>26 авг</div>
      </div>
      <div className='col-lg-5'>
        <div className={classes.name}>
          <div className={classes.command}>
            <div className={classes.label}>{team1}</div>
            <div className={classes.logo}>
              <img
                alt=''
                src='img/barselona.png'
              />
            </div>
          </div>
          <div className={classes.score}>— : —</div>
          <div className={classes.command}>
            <div className={classes.logo}>
              <img
                alt=''
                src='img/barselona.png'
              />
            </div>
            <div className={classes.label}>{team2}</div>
          </div>
        </div>
      </div>
      <div className='col-lg-6'>
        <div className={classes.coefficient}>
          <Link className="btn-coefficient">1x <span className="number">{cf1}</span></Link>
          <Link className="btn-coefficient">x <span className="number">{cf2}</span></Link>
          <Link className="btn-coefficient">x <span className="number">{cf3}</span></Link>
          <Link className="btn-coefficient">Б <span className="number">{cf4}</span></Link>
          <Link className="btn-coefficient">Т <span className="number">{cf5}</span></Link>
          <Link className="btn-coefficient">М <span className="number">{cf6}</span></Link>
          { show
            ? <span
              className={cn(classes.more, classes.active)}
              onClick={onShowCoefClick}
            >
                Скрыть
            </span>
            : <span
              className={classes.more}
              onClick={onShowCoefClick}
            >
                +16 событий
            </span> }

        </div>
      </div>
      { show
        ? <MatchInfoMore
          cf1={cf1}
          cf2={cf2}
          cf3={cf3}
          cf4={cf4}
          cf5={cf5}
          cf6={cf6}
        />
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
