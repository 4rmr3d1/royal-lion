import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '@app/styles/mui-theme'
import { PageLayout } from '../page-layout'

import '@app/styles/style.scss'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <PageLayout />
      </BrowserRouter>
    </ThemeProvider>
  )
}
