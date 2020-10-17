import React from 'react'
import { SnackbarContent } from 'notistack'

import classes from './style.module.scss'

export const SuccessMessage = React.forwardRef((props, ref) => {
  return (
    <SnackbarContent
      className={classes.snackBar}
      ref={ref}
    >
      <h2>Успешно!</h2>
      <span>
        {props.message}
      </span>
    </SnackbarContent>
  )
})

SuccessMessage.displayName = 'SuccessMessage'
