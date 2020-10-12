import React from 'react'
import { FormattedTime } from 'react-intl'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import { IconButton, AccordionDetails, Accordion, AccordionSummary } from '@material-ui/core/'
import { useSelector, useDispatch, results } from '@app/store'

import './index.scss'

export const Result = () => {
  const { dispatch } = useDispatch()

  const sportId = useSelector(state => state.selectedCategory.category)
  const matchesResults = useSelector(state => state.results?.matches)

  const [page, setPage] = React.useState(0)

  React.useEffect(() => {
    dispatch(results.loadResults({ sportId, page }))
  }, [dispatch, page, sportId])

  React.useEffect(() => { document.title = 'Royal Lion | Результаты' }, [])

  return (
    <section className='result'>
      <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          color='primary'
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          <ArrowBack/>
        </IconButton>

        <IconButton
          color='primary'
          onClick={() => setPage(page + 1)}
        >
          <ArrowForward/>
        </IconButton>
      </div>
      <Accordion expanded>
        <AccordionSummary>
          Результаты
        </AccordionSummary>
        <AccordionDetails>
          {matchesResults?.map((result, index) => (
            <AccordionDetails key={index}>
              <ResultInfo
                data={result}
              />
            </AccordionDetails>
          ))}
        </AccordionDetails>
      </Accordion>
    </section>
  )
}
const ResultInfo = ({ data }) => {
  return (
    <div className="resultInfo">
      <div className="date">
        <FormattedTime
          day='2-digit'
          month='short'
          value={data?.game_start}
        />
        —
        <FormattedTime value={data?.game_start}/>
      </div>
      <div className="name">
        <div className="command">
          <div className="label">{data.opp_1_name}</div>
          <div className="logo">
            <img
              alt=''
              src={data.opp_1_icon}
              style={{ maxWidth: 30, height: 'auto' }}
            />
          </div>
        </div>
        <div className="score">{data.score_full}</div>
        <div className="command">
          <div className="logo">
            <img
              alt=''
              src={data.opp_2_icon}
              style={{ maxWidth: 30, height: 'auto' }}
            />
          </div>
          <div className="label">{data.opp_2_name}</div>
        </div>
      </div>
    </div>
  )
}
