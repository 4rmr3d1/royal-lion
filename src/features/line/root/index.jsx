import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core/'
import { MatchInfo } from '@app/ui'
import { useSelector, useDispatch, line } from '@app/store'

import './index.scss'

const matches = [
  {
    date: new Date(),
    team1: 'Команда 1',
    team2: 'Команда 2',
    cf1: '2.37',
    cf2: '2.37',
    cf3: '2.37',
    cf4: '2.37',
    cf5: '2.37',
    cf6: '2.37'
  }
]

export const Line = () => {
  const { dispatch } = useDispatch()
  const currentCategory = useSelector(state => state.selectedCategory.category)

  React.useEffect(() => {
    dispatch(line.loadLineTournaments({ sportId: '0' }))
  }, [])

  return (
    <section className='line'>
      <h2>{currentCategory}</h2>
      <div className='container'>
        <Accordion>
          <AccordionSummary expandIcon={<i className='icon-chevron-down'></i>}>
Table Soccer League
          </AccordionSummary>
          <AccordionDetails>
            {matches.map((match, index) => (
              <MatchInfo
                cf1={match.cf1}
                cf2={match.cf2}
                cf3={match.cf3}
                cf4={match.cf4}
                cf5={match.cf5}
                cf6={match.cf6}
                date={match.date}
                key={index}
                team1={match.team1}
                team2={match.team2}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  )
}
