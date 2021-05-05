import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, userActions, useSelector } from '@app/store'

import classes from './style.module.scss'

export const Activate = () => {
  const { dispatch } = useDispatch()
  const location = useParams()

  const isActivated = useSelector(state => state.authReducer?.activation.success)
  const activationError = useSelector(state => state.authReducer?.activation.error)

  React.useEffect(() => {
    dispatch(userActions.activateAccount({ code: location.id }))
  }, [dispatch])

  return (
    <div className={classes.activationBar}>
      {isActivated ? (
        <h3>Ваш аккаунт активирован!</h3>
      ) : (
        <h3>{activationError}</h3>
      )}
    </div>
  )
}
