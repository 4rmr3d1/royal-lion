import React from 'react'
import { FormattedTime, FormattedDate } from 'react-intl'
import { Pagination } from '@material-ui/lab'
import { useMediaQuery, AccordionDetails, Accordion, AccordionSummary, CircularProgress } from '@material-ui/core/'
import { useSelector, useDispatch, results } from '@app/store'

import classes from './style.module.scss'

export const Result = () => {
  const { dispatch } = useDispatch()

  const sportId = useSelector(state => state.selectedCategory.category)
  const matchesResults = useSelector(state => state.results?.matches)
  const length = useSelector(state => state.results?.length)
  const loading = useSelector(state => state.results?.loading)

  const [page, setPage] = React.useState(1)

  const onPaginationChange = React.useCallback((event, page) => {
    setPage(page)
  }, [setPage])

  const totalPages = React.useMemo(() => {
    return Math.ceil(length / 10)
  }, [length])

  React.useEffect(() => {
    dispatch(results.loadResults({ sportId, page: page - 1 }))
  }, [sportId, page])

  React.useEffect(() => { document.title = 'Royal Lion | Результаты' }, [])

  return (
    <section className={classes.result}>
      {length > 20 &&
          <div className={classes.pagination}>
            <Pagination
              color='primary'
              count={totalPages}
              page={page}
              shape="rounded"
              onChange={onPaginationChange}
            />
          </div>
      }

      {!loading ? (
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
      ) : (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}

      {length > 20 &&
        <div className={classes.pagination}>
          <Pagination
            color='primary'
            count={totalPages}
            page={page}
            shape="rounded"
            onChange={onPaginationChange}
          />
        </div>
      }
    </section>
  )
}

const ResultInfo = ({ data }) => {
  const lgBreakPoint = useMediaQuery('(max-width: 991px)')
  return (
    <div className={classes.resultInfo}>
      {lgBreakPoint
        ? (
          <div className={classes.date}>
            <div className={classes.time}>
              <FormattedTime value={data?.game_start}/>
            </div>
            <FormattedDate
              day='2-digit'
              month='short'
              value={data?.game_start}
            />
          </div>
        ) : (
          <div className={classes.date}>
            <FormattedDate
              day='2-digit'
              month='short'
              value={data?.game_start}
            />
            —
            <FormattedTime value={data?.game_start}/>
          </div>
        )
      }

      {lgBreakPoint
        ? (
          <>
            <div className={classes.name}>
              <div className={classes.command}>
                <div className={classes.logo}>
                  <img
                    alt=''
                    src={data.opp_1_icon}
                    style={{ maxWidth: 30, height: 'auto' }}
                  />
                </div>
                <div className={classes.label}>{data.opp_1_name}</div>
              </div>
              <div className={classes.command}>
                <div className={classes.logo}>
                  <img
                    alt=''
                    src={data.opp_2_icon}
                    style={{ maxWidth: 30, height: 'auto' }}
                  />
                </div>
                <div className={classes.label}>{data.opp_2_name}</div>
              </div>
            </div>
            <div className={classes.score}>{data.score_full}</div>
          </>
        ) : (
          <div className={classes.name}>
            <div className={classes.command}>
              <div className={classes.label}>{data.opp_1_name}</div>
              <div className={classes.logo}>
                <img
                  alt=''
                  src={data.opp_1_icon}
                  style={{ maxWidth: 30, height: 'auto' }}
                />
              </div>
            </div>
            <div className={classes.score}>{data.score_full}</div>
            <div className={classes.command}>
              <div className={classes.logo}>
                <img
                  alt=''
                  src={data.opp_2_icon}
                  style={{ maxWidth: 30, height: 'auto' }}
                />
              </div>
              <div className={classes.label}>{data.opp_2_name}</div>
            </div>
          </div>
        )
      }
    </div>
  )
}
