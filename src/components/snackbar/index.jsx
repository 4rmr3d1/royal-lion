import React from 'react'
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack'
import { SuccessMessage } from '@app/ui'

export const SnackbarProvider = ({ children }) => {
  return (
    <NotistackSnackbarProvider
      content={(key, message) => (
        <SuccessMessage
          id={key}
          message={message}
        />
      )}
      hideIconVariant
      maxSnack={3}
    >
      {children}
    </NotistackSnackbarProvider>
  )
}
