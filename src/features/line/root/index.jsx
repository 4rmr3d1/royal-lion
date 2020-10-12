import React from 'react'
import { CircularProgress, IconButton } from '@material-ui/core/'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import { MatchInfoPane as MatchInfo } from '@app/ui'
import { useSelector, useDispatch, line } from '@app/store'
import { BetModal } from '@app/shared-features'

import './index.scss'

export const Line = () => {
  const { dispatch } = useDispatch()

  const lineMatches = useSelector(state => state.lineMatches.tournaments)
  const sportId = useSelector(state => state.selectedCategory.category)
  const isLoaded = useSelector(state => state.lineMatches.isLoaded)
  const open = useSelector(state => state.authReducer.properties.betModalVisible)

  const [page, setPage] = React.useState(0)

  const onClose = React.useCallback(() => {
    dispatch({
      type: '@USER/change-property',
      payload: { betModalVisible: false }
    })
  }, [dispatch])

  React.useEffect(() => {
    dispatch(line.loadLineTournaments({ sportId, page }))
  }, [sportId, page])

  React.useEffect(() => { document.title = 'Royal Lion | Линия' }, [])

  return (
    <>
      <BetModal
        open={open}
        onClose={onClose}
      />

      <section className='line'>
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

        {isLoaded ? (
          <>
            {lineMatches?.map((data, index) => (
              <MatchInfo
                data={data}
                key={index}
              />
            ))}
            {lineMatches.length === 0 && (
              'Список матчей пуст!'
            )}
          </>
        ) : (
          <div className='loader'>
            <CircularProgress />
          </div>
        )}
      </section>
    </>
  )
}
