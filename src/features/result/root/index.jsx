import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core/'

import './index.scss'

import { useSelector, useDispatch, bet } from '@app/store'

const results = [
  {
    date: '15.08.2020',
    time: '08:34',
    team1: 'Барселона',
    team2: 'Манчестер Юнайтед',
    scoreTotal: '1:2',
    scoreFirst: '1:0',
    scoreLast: '0:2'
  },
  {
    date: '29.01.2020',
    time: '03:34',
    team1: 'Манчестер Юнайтед',
    team2: 'Барселона',
    scoreTotal: '4:4',
    scoreFirst: '1:2',
    scoreLast: '3:2'
  }
]

export const Result = () => {
  const { dispatch } = useDispatch()
  const sportId = useSelector(state => state.selectedCategory.category)
  console.log(sportId)

  React.useEffect(() => {
    dispatch(bet.getBets({ }))
  }, [dispatch])

  React.useEffect(() => { document.title = 'Royal Lion | Результаты' }, [])

  return (
    <section className='result'>
      <Accordion>
        <AccordionSummary expandIcon={<i className='icon-chevron-down'></i>}>Table Soccer League</AccordionSummary>
        <AccordionDetails>
          {results.map((result, index) => (
            <ResultInfo
              date={result.date}
              key={result.index}
              scoreFirst={result.scoreFirst}
              scoreLast={result.scoreLast}
              scoreTotal={result.scoreTotal}
              team1={result.team1}
              team2={result.team2}
              time={result.time}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </section>
  )
}
const ResultInfo = ({
  date,
  time,
  team1,
  team2,
  scoreTotal,
  scoreFirst,
  scoreLast
}) => {
  return (
    <div className="resultInfo">
      <div className="date">
        {date} — {time}
      </div>
      <div className="name">
        <div className="command">
          <div className="label">{team1}</div>
          <div className="logo">
            <img
              alt=''
              src='img/barselona.png'
            />
          </div>
        </div>
        <div className="score">{scoreTotal} ({scoreFirst}-{scoreLast})</div>
        <div className="command">
          <div className="logo">
            <img
              alt=''
              src='img/barselona.png'
            />
          </div>
          <div className="label">{team2}</div>
        </div>
      </div>
    </div>
  )
}
