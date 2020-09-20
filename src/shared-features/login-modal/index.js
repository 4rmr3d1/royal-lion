import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Redirect } from 'react-router-dom'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from '@material-ui/core'
import { useDispatch, useSelector } from '@app/store'
import { Button, ErrorText } from '@app/ui'
import { userActions } from '@app/store/actions/userActions'

import classes from './style.module.scss'

const validationSchema = yup.object({
  username: yup.string().required('Поле необходимо для заполнения'),
  password: yup.string().required('Поле необходимо для заполнения')
})

export const LoginModal = ({ visible, onClose }) => {
  const { dispatch } = useDispatch()

  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn)
  const serverErrors = useSelector(state => state.authReducer.user?.error)

  const initialValues = {
    username: '',
    password: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => dispatch(userActions.login(values)),
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

  if (isLoggedIn) {
    return <Redirect to='/profile' />
  }

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
              placeholder='Почта'
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
              value={formik.values.password}
              variant='outlined'
              onChange={formik.handleChange}
            />
            <ErrorText message={hasErrors.password}/>
          </div>

          <Button
            fullWidth
            type='submit'
            variant='big'
          >
            Войти
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
