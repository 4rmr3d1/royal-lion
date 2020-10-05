import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@material-ui/core/'
import { MatchInfo } from '@app/ui'
import { useSelector, useDispatch, line } from '@app/store'

import './index.scss'

export const Line = () => {
  const { dispatch } = useDispatch()

  const lineMatches = useSelector(state => state.lineMatches.tournaments)
  const sportId = useSelector(state => state.selectedCategory.category)
  const isLoaded = useSelector(state => state.lineMatches.isLoaded)

  const filteredLineMatches = React.useMemo(() => {
    return lineMatches.filter(tournament => tournament?.matches.length !== 0)
  }, [lineMatches])

  React.useEffect(() => {
    dispatch(line.loadLineTournaments({ sportId }))
  }, [sportId])

  return (
    <section className='line'>
      {isLoaded ? (
        <>
          {filteredLineMatches?.map((tournament, index) => (
            <Accordion key={tournament.api_id || index}>
              <AccordionSummary expandIcon={<i className='icon-chevron-down'></i>}>
                {tournament.name}
              </AccordionSummary>
              <AccordionDetails>
                {tournament?.matches.map((data, index) => (
                  <MatchInfo
                    data={data}
                    key={index}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
          {filteredLineMatches.length === 0 && (
            'Список матчей пуст!'
          )}
        </>
      ) : (
        <div className='loader'>
          <CircularProgress />
        </div>
      )}
    </section>
  )
}
