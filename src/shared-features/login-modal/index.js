import React from 'react'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { DialogTitle, DialogContent, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from '@app/store'
import { Button, ErrorText, Dialog } from '@app/ui'
import { userActions } from '@app/store/actions/userActions'

import classes from './style.module.scss'

const validationSchema = yup.object({
  username: yup.string().required('Поле необходимо заполнить'),
  password: yup.string().required('Поле необходимо заполнить')
})

export const LoginModal = ({ visible, onClose }) => {
  const { dispatch } = useDispatch()
  const history = useHistory()

  const serverErrors = useSelector(state => state.authReducer.user?.error)

  const initialValues = {
    username: '',
    password: ''
  }

  const onRegistrationClick = React.useCallback(() => {
    dispatch({
      type: '@USER/change-property',
      payload: {
        authModalVisible: false
      }
    })

    history.push('/registration')
  }, [dispatch])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(userActions.login(values))
    },
    validateOnChange: false
  })

  const hasErrors = React.useMemo(() => {
    return formik.errors || null
  }, [formik])

  const hasServerErrors = React.useMemo(() => {
    if (serverErrors) {
      return Object.values(serverErrors)
    }
  })

  return (
    <Dialog
      open={visible}
      onClose={onClose}
    >
      <DialogTitle
        disableTypography
        style={{ textAlign: 'center' }}
      >
        <h2>Авторизация</h2>
      </DialogTitle>

      <DialogContent>
        <form
          className={classes.form}
          onSubmit={formik.handleSubmit}
        >
          {hasServerErrors && (
            <ErrorText message='Неверный логин или пароль'/>
          )}
          <div>
            <TextField
              error={!!hasErrors.username || hasServerErrors}
              fullWidth
              name='username'
              placeholder='Логин'
              value={formik.values.username}
              variant='outlined'
              onChange={formik.handleChange}
            />
            <ErrorText message={hasErrors.username}/>
          </div>

          <div>
            <TextField
              error={!!hasErrors.password || hasServerErrors}
              fullWidth
              name='password'
              placeholder='Пароль'
              type='password'
              value={formik.values.password}
              variant='outlined'
              onChange={formik.handleChange}
            />
            <ErrorText message={hasErrors.password}/>
          </div>

          <Button
            color='primary'
            fullWidth
            type='submit'
            variant='big'
          >
            Войти
          </Button>
        </form>

        <Button
          color='secondary'
          fullWidth
          variant='big'
          onClick={() => onRegistrationClick()}
        >
          регистрация
        </Button>
      </DialogContent>
    </Dialog>
  )
}
