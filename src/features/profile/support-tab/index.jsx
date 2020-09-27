import React from 'react'
import { TextField, FormControl, Select, MenuItem } from '@material-ui/core'

import classes from './style.module.scss'

export const SupportTab = () => {
  return (
    <>
      <h3>Техническая поддержка</h3>

      <form>
        <div className='form-row row'>
          <div className='col-lg-4'>
            <span className={classes.inputLabel}>Отдел</span>
            <FormControl
              fullWidth
              variant='outlined'
            >
              <Select >
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className='col-lg-4'>
            <span className={classes.inputLabel}>Почта для ответа</span>
            <FormControl >
              <TextField variant='outlined' />
            </FormControl>
          </div>
        </div>

        <div className='form-row row'>
          <div className='col-lg-8'>
            <span className={classes.inputLabel}>Сообщение</span>
            <FormControl
              fullWidth
            >
              <TextField
                multiline
                rows={5}
                variant='outlined'
              />
            </FormControl>
          </div>
        </div>
      </form>
    </>
  )
}
