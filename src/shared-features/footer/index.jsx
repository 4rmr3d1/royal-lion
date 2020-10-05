import React from 'react'
import { useMediaQuery } from '@material-ui/core'

import classes from './style.module.scss'

export const Footer = () => {
  const smBreakPoint = useMediaQuery('(max-width: 500px)')

  return (
    <>
      {smBreakPoint ? (
        <footer className={classes.footer}>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-lg-3'>
                <div className={classes.brand}>
                  <img
                    alt=''
                    src='img/logo-footer.svg'
                  />
                </div>
              </div>
              <nav className='col-lg-6'>
                <a href='#'>Правила сайта</a>
                <a href='#'>Пользовательское соглашение.</a>
              </nav>
              <div className='col-lg-3'>
                <p className='copy'>@ 1994-2020 All rights reserved</p>
              </div>
            </div>
          </div>
        </footer>
      ) : (
        <footer></footer>
      )}
    </>
  )
}
