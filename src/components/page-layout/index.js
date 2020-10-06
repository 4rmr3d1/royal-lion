import React from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import { Header, Sidebar, Footer } from '@app/shared-features'
import { Content } from '../content'

import classes from './style.module.scss'

const hiddenSideBarUrls = [
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
    return hiddenSideBarUrls.some(url => url === location.pathname) && breakPoint
  }, [location.pathname, breakPoint])

  return (
    <div className={classes.pageContainer}>
      <Header />
      {!isSidebarVisible && (
        <Sidebar />
      )}
      <Content />
      <Footer />
    </div>
  )
}
