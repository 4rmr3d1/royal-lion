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

const modalState = {
  auth: 'auth',
  passwordForgot: 'passwordForgot',
  success: 'success'
}

export const LoginModal = ({ visible, onClose }) => {
  const state = useSelector(state => state.authReducer.properties.authModalStep)

  const modalTitle = React.useMemo(() => {
    switch (state) {
    case 'auth': return 'Авторизация'
    case 'passwordForgot': return 'Востановление пароля'
    case 'success': return 'Ваш пароль уже на почте'

    default: return 'Авторизация'
    }
  }, [state])

  return (
    <>
      <Dialog
        open={visible}
        onClose={onClose}
      >
        <DialogTitle
          disableTypography
          style={{ textAlign: 'center' }}
        >
          <h2>{modalTitle}</h2>
        </DialogTitle>

        <DialogContent>

          {state === modalState.auth && (
            <AuthModal />
          )}

          {state === modalState.passwordForgot && (
            <PasswordForgotModal />
          )}

          {state === modalState.success && (
            <Success />
          )}

        </DialogContent>
      </Dialog>

    </>
  )
}

export const AuthModal = () => {
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
        authModalVisible: false,
        burgerVisible: false
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

  const onPasswordForgotClick = React.useCallback((e) => {
    e.preventDefault()

    dispatch({
      type: '@USER/change-property',
      payload: {
        authModalStep: modalState.passwordForgot
      }
    })
  }, [dispatch, modalState])

  const hasErrors = React.useMemo(() => {
    return formik.errors || null
  }, [formik])

  const hasServerErrors = React.useMemo(() => {
    if (serverErrors) {
      return Object.values(serverErrors)
    }
  })

  return (
    <>
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

      <div className={classes.forgot}>
        <a
          href='#'
          onClick={onPasswordForgotClick}
        >
          Забыли пароль
        </a>
      </div>

      <Button
        color='secondary'
        fullWidth
        variant='big'
        onClick={() => onRegistrationClick()}
      >
        регистрация
      </Button>
    </>
  )
}

const PasswordForgotModal = () => {
  const { dispatch } = useDispatch()

  const error = useSelector(state => state.authReducer.login.recoveryError)

  const [data, setData] = React.useState('')

  const onDataChange = React.useCallback((e) => {
    setData(e.target.value)
  }, [setData])

  const onSubmit = React.useCallback((e) => {
    e.preventDefault()

    dispatch(userActions.forgotPassword({ data }))
  }, [dispatch, data])

  return (
    <>
      <div className={classes.description}>
        Ввелите логин или пароль, а мы вышлем вам новый пароль
      </div>

      <form
        className={classes.form}
        onSubmit={onSubmit}
      >
        <div>
          <TextField
            error={!!error}
            fullWidth
            placeholder='Введите Ваш логин или e-mail'
            value={data}
            variant='outlined'
            onChange={onDataChange}
          />
          <ErrorText message={error}/>
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
    </>
  )
}

const Success = () => {
  return (
    <div className={classes.success}>
      <img
        alt=""
        src="https://king-kong.bet/img/success.svg"
      />
    </div>
  )
}
