import React from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import { Header, Sidebar, Footer } from '@app/shared-features'
import { Content } from '../content'

import classes from './style.module.scss'

const urls = [
  '/profile',
  '/profile/configurations',
  '/profile/history',
  '/profile/withdraw',
  '/profile/support',
  '/profile/coupon'
]

export const PageLayout = () => {
  const location = useLocation()
  const breakPoint = useMediaQuery('(max-width: 576px)')

  const isSidebarVisible = React.useMemo(() => {
    return urls.some(url => url === location.pathname) && breakPoint
  }, [location.pathname, breakPoint])

  const isSidebarDisabled = React.useMemo(() => {
    return urls.some(url => url === location.pathname)
  })

  console.log(isSidebarDisabled)

  return (
    <div className={classes.pageContainer}>
      <Header />
      {!isSidebarVisible && (
        <Sidebar disabled = {!!isSidebarDisabled}/>
      )}
      <Content />
      <Footer />
    </div>
  )
}
