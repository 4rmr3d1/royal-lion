import React from 'react'
import { Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { useDispatch, userActions } from '@app/store'
import { theme } from '@app/styles/mui-theme'
import { PageLayout } from '../page-layout'
import history from '@app/lib/history'

import '@app/styles/style.scss'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

export const App = () => {
  const { dispatch } = useDispatch()

  React.useEffect(() => {
    dispatch(userActions.getUser())
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <PageLayout />
      </Router>
    </ThemeProvider>
  )
}
