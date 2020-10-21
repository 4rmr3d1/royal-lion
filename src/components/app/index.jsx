import React from 'react'
import { Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@material-ui/core/styles'
import { useDispatch, userActions } from '@app/store'
import { SuccessMessage } from '@app/ui'
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
      <SnackbarProvider
        autoHideDuration={3000}
        content={(key, message) => (
          <SuccessMessage
            id={key}
            message={message}
          />
        )}
        hideIconVariant
        maxSnack={3}
      >
        <Router history={history}>
          <PageLayout />
        </Router>
      </SnackbarProvider>

    </ThemeProvider>
  )
}
