import React from 'react'
import { CircularProgress } from '@material-ui/core/'
import { MatchInfoPane as MatchInfo } from '@app/ui'
import { useSelector, useDispatch, live } from '@app/store'
import { BetModal } from '@app/shared-features'

import './index.scss'

export const Live = () => {
  const { dispatch } = useDispatch()

  const liveMatches = useSelector(state => state.liveMatches?.tournaments)
  const sportId = useSelector(state => state.selectedCategory.category)
  const isLoaded = useSelector(state => state.liveMatches.isLoaded)
  const open = useSelector(state => state.authReducer.properties.betModalVisible)

  const onClose = React.useCallback(() => {
    dispatch({
      type: '@USER/change-property',
      payload: { betModalVisible: false }
    })
  }, [dispatch])

  React.useEffect(() => {
    const timer = setInterval(() => {
      dispatch(live.loadLiveTournaments({ sportId }))
    }, 60000)

    return () => clearInterval(timer)
  })

  React.useEffect(() => {
    dispatch(live.loadLiveTournaments({ sportId }))
  }, [sportId])

  return (
    <>
      <BetModal
        open={open}
        onClose={onClose}
      />

      <section className='line live'>
        <div className='row'>
          <div className='col-12'>
            <div className='live-label'>
              <div className='live-icon'>
                <img
                  alt=''
                  src='img/live.svg'
                />
              </div>В прямом эфире
            </div>
          </div>
        </div>
        {isLoaded ? (
          <>
            {liveMatches?.map((data, index) => (
              <MatchInfo
                data={data}
                key={index}
              />
            ))}
          </>
        ) : (
          <CircularProgress />
        )}
      </section>
    </>
  )
}
