import React from 'react'
import cn from 'classnames'
import classes from './style.module.scss'

export const Button = ({ type, variant, children, fullWidth, color, ...props }) => {
  return (
    <>
      <button
        className={cn(
          classes.btn,
          { [classes.btnBig]: variant === 'big' },
          { [classes.btnSmall]: variant === 'small' },
          { [classes.primary]: color === 'primary' },
          { [classes.secondary]: color === 'secondary' },
          { [classes.btnFullWidth]: fullWidth }
        )}
        type={type}
        {...props}
      >
        {children}
      </button>
    </>
  )
}
