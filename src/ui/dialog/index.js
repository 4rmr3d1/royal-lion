import React from 'react'
import { Dialog as MuiDialog } from '@material-ui/core'
import { Close } from '@material-ui/icons'

import classes from './style.module.scss'

export const Dialog = ({ open, onClose, children, ...props }) => {
  return (
    <div className={classes.dialog}>
      <MuiDialog
        open={open}
        onClose={onClose}
        {...props}
      >
        <div className={classes.closeButton}>
          <button onClick={onClose}>
            <Close style={{ fontSize: 36 }}/>
          </button>
        </div>
        {children}
      </MuiDialog>
    </div>
  )
}
