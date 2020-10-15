import React from 'react'
import { CircularProgress } from '@material-ui/core/'
import { Pagination } from '@material-ui/lab'
import { MatchInfoPane as MatchInfo } from '@app/ui'
import { useSelector, useDispatch, line } from '@app/store'
import { BetModal } from '@app/shared-features'

import classes from './style.module.scss'

export const Line = () => {
  const { dispatch } = useDispatch()

  const sportId = useSelector(state => state.selectedCategory.category)

  const isLoaded = useSelector(state => state.lineMatches.isLoaded)
  const lineMatches = useSelector(state => state.lineMatches.tournaments)
  const length = useSelector(state => state.lineMatches.length)

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

  const onPaginationChange = React.useCallback((event, page) => {
    setPage(page)
  }, [setPage])

  const totalPages = React.useMemo(() => {
    return Math.ceil(length / 10)
  }, [length])

  React.useEffect(() => {
    dispatch(line.loadLineTournaments({ sportId, page: page - 1 }))
  }, [sportId, page])

  React.useEffect(() => { document.title = 'Royal Lion | Линия' }, [])

  return (
    <>
      <BetModal
        open={open}
        onClose={onClose}
      />

      <section className={classes.line}>
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
            {lineMatches?.map((data, index) => (
              <MatchInfo
                data={data}
                key={index}
              />
            ))}
            {lineMatches.length > 0 && (
              <div style={{ width: '100%', height: 'auto', textAlign: 'center' }}>
                <img src='img/noData.png' />
                <span style={{ fontSize: 48, lineHeight: 57 }}>НЕТ ДАННЫХ</span>
              </div>
            )}
          </>
        ) : (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
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
