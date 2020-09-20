import React from 'react'
import cn from 'classnames'
import classes from './style.module.scss'

export const Button = ({ type, variant, children, fullWidth }) => {
  return (
    <>
      <button
        className={cn(
          classes.btn,
          { [classes.btnBig]: variant === 'big' },
          { [classes.btnSmall]: variant === 'small' },
          { [classes.btnFullWidth]: fullWidth }
        )}
        type={type}
      >
        {children}
      </button>
    </>
  )
}
