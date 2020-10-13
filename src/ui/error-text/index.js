import React from 'react'
import classes from './style.module.scss'

export const ErrorText = ({ message, style }) => {
  return (
    <div
      className={classes.errorText}
      style={style}
    >
      {message}
    </div>
  )
}
