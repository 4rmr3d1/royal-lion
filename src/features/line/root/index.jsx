import React from 'react'
import { CircularProgress } from '@material-ui/core/'
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

  const onClose = React.useCallback(() => {
    dispatch({
      type: '@USER/change-property',
      payload: { betModalVisible: false }
    })
  }, [dispatch])

  const filteredLineMatches = React.useMemo(() => {
    return lineMatches.filter(tournament => tournament?.matches.length !== 0)
  }, [lineMatches])

  React.useEffect(() => {
    dispatch(line.loadLineTournaments({ sportId }))
  }, [sportId])

  return (
    <>
      <BetModal
        open={open}
        onClose={onClose}
      />

      <section className='line'>
        {isLoaded ? (
          <>
            {filteredLineMatches?.map((data, index) => (
              <MatchInfo
                data={data}
                key={index}
              />
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
    </>
  )
}
