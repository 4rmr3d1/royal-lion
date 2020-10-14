import { useCallback, useRef } from 'react'
import { useSnackbar } from 'notistack'

export const useNotifications = () => {
  const alignParams = useRef({
    horizontal: 'center',
    vertical: 'top'
  })

  const { enqueueSnackbar } = useSnackbar()

  const showSuccessMessage = useCallback((message) => {
    const snackbarText = message

    enqueueSnackbar(snackbarText, {
      anchorOrigin: alignParams.current,
      variant: 'info'
    })
  }, [enqueueSnackbar])

  return {
    showSuccessMessage
  }
}
