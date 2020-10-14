import React from 'react'
import { useMediaQuery } from '@material-ui/core'

import classes from './style.module.scss'

export const Footer = () => {
  const smBreakPoint = useMediaQuery('(max-width: 576px)')

  return (
    <>
      {!smBreakPoint ? (
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
                <a href='rules.pdf'>Правила сайта</a>
                <a href='policy.pdf'>Пользовательское соглашение.</a>
              </nav>
              <div className='col-lg-3'>
                <p className='copy'>@ 1994-2020 All rights reserved</p>
              </div>
            </div>
          </div>
        </footer>
      ) : (
        <footer className={classes.footer}>
          <div className={classes.footerBlock}>
            <div className={classes.brand}>
              <img
                alt=''
                src='img/logo-footer.svg'
              />
            </div>

            <div className={classes.credits}>
              @ 1994-2020 All rights reserved
            </div>
          </div>
          <nav>
            <a href="rules.pdf">
              Правила сайта
            </a>
            <a href="policy.pdf">
              Пользовательское соглашение.
            </a>
          </nav>
        </footer>
      )}
    </>
  )
}
