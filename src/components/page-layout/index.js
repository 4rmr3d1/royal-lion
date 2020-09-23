import React from 'react'
import { Header, Sidebar, Footer } from '@app/shared-features'
import { Content } from '../content'

export const PageLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </>
  )
}
