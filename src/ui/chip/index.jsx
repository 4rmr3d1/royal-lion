import React from 'react'
import cn from 'classnames'

import classes from './style.module.scss'

export const Chip = ({ children, variant, status, flexBasis, padding, style }) => {
  return (
    <div
      className={cn(
        classes.chip,
        { [classes.contained]: variant === 'contained' },
        { [classes.outlined]: variant === 'outlined' },
        { [classes.muted]: variant === 'muted' },
        { [classes.pending]: status === null },
        { [classes.error]: status === false },
        { [classes.success]: status === true }
      )}
      style={{
        flexBasis: flexBasis,
        padding: padding,
        ...style
      }}
    >
      <span>
        {children}
      </span>
    </div>
  )
}
