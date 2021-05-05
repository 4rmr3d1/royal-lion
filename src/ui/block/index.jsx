import React from 'react'
import cn from 'classnames'

import classes from './style.module.scss'

export const Block = ({ children, blockPadding, className }) => {
  return (
    <div className={cn(classes.block, className, { [classes.blockPadding]: blockPadding })}>
      {children}
    </div>
  )
}

export const BlockItem = ({ children }) => {
  return (
    <div className={classes.blockItem}>
      {children}
    </div>
  )
}
