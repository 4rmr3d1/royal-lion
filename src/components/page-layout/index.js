import React from 'react'
import { Header, Sidebar, Footer } from '@app/shared-features'
import { Content } from '../content'

import classes from './style.module.scss'

export const PageLayout = () => {
  return (
    <div className={classes.pageContainer}>
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </div>
  )
}
