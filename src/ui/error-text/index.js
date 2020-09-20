import React from 'react'
import classes from './style.module.scss'

export const ErrorText = ({ message }) => {
  return (
    <div className={classes.errorText}>
      {message}
    </div>
  )
}
