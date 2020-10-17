import React from 'react'
import cn from 'classnames'
import { CircularProgress } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { MatchInfoPane as MatchInfo } from '@app/ui'
import { useSelector, useDispatch, live } from '@app/store'
import { BetModal } from '@app/shared-features'

import classes from './style.module.scss'

export const usePrevious = (previous) => {
  const reference = React.useRef()

  React.useEffect(() => {
    reference.current = previous
  })

  return reference.current
}

export const Live = () => {
  const { dispatch } = useDispatch()

  const sportId = useSelector(state => state.selectedCategory.category)

  const isLoaded = useSelector(state => state.liveMatches.isLoaded)
  const liveMatches = useSelector(state => state.liveMatches?.tournaments)
  const length = useSelector(state => state.liveMatches.length)

  const open = useSelector(state => state.authReducer.properties.betModalVisible)

  const [page, setPage] = React.useState(1)

  const onClose = React.useCallback(() => {
    dispatch({
      type: '@USER/change-property',
      payload: { betModalVisible: false }
    })

    dispatch({
      type: '@BET/reset'
    })
  }, [dispatch])

  React.useEffect(() => {
    const timer = setInterval(() => {
      dispatch(live.loadLiveTournaments({ sportId, page: page - 1 }))
    }, 60000)

    return () => clearInterval(timer)
  })

  const onPaginationChange = React.useCallback((event, page) => {
    setPage(page)
  }, [setPage])

  const totalPages = React.useMemo(() => {
    return Math.ceil(length / 10)
  }, [length])

  React.useEffect(() => {
    dispatch(live.loadLiveTournaments({ sportId, page: page - 1 }))
  }, [sportId, page])

  React.useEffect(() => { document.title = 'Royal Lion | Лайв' }, [])

  return (
    <>
      <BetModal
        open={open}
        onClose={onClose}
      />

      <section className={cn(classes.line, classes.live)}>
        <div className='row'>
          <div className='col-12'>
            <div className={classes.liveLabel}>
              <div className={classes.liveIcon}>
                <img
                  alt=''
                  src='img/live.svg'
                />
              </div>В прямом эфире
            </div>
          </div>
        </div>

        {length > 10 &&
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

        {isLoaded ? (
          <>
            {liveMatches?.map((data, index) => (
              <MatchInfo
                data={data}
                key={index | data.api_id}
              />
            ))}
          </>
        ) : (
          <CircularProgress />
        )}

        {length > 10 &&
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
    </>
  )
}
