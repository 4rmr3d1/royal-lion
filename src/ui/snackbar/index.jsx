import React from 'react'
import { SnackbarContent, useSnackbar } from 'notistack'

import classes from './style.module.scss'

export const SuccessMessage = React.forwardRef((props, ref) => {
  const { closeSnackbar } = useSnackbar()

  return (
    <SnackbarContent
      className={classes.snackBar}
      ref={ref}
    >
      <button
        className={classes.close}
        onClick={() => closeSnackbar(props.id)}
      ></button>
      <h2>Успешно!</h2>
      <span>
        {props.message}
      </span>
    </SnackbarContent>
  )
})

SuccessMessage.displayName = 'SuccessMessage'
