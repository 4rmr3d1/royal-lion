import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Alert } from '@material-ui/lab'
import { TextField, FormControl, OutlinedInput } from '@material-ui/core'
import { useDispatch, useSelector, userActions } from '@app/store'
import { Block, BlockItem, Button, ErrorText, PhoneTextMask } from '@app/ui'

import classes from './style.module.scss'

export const ConfigurationTab = () => {
  const { dispatch } = useDispatch()

  React.useEffect(() => {
    return () => dispatch({ type: '@USER/reset-configurations' })
  }, [dispatch])

  return (
    <>
      <h3>Настройки профиля</h3>

      <Block blockPadding>
        <PasswordChange />
      </Block>

      <Block blockPadding>
        <ContactsChange />
      </Block>
    </>
  )
}

const passwordChangeValidationSchema = yup.object({
  oldPassword: yup.string()
    .test('stringLength', 'Пароль должен содержать минимум 4 символа', string => string?.length >= 4)
    .required('Поле необходимо заполнить'),
  newPassword: yup.string()
    .test('stringLength', 'Пароль должен содержать минимум 4 символа', string => string?.length >= 4)
    .required('Поле необходимо заполнить'),
  newPasswordConfirm: yup.string()
    .test('stringLength', 'Пароль должен содержать минимум 4 символа', string => string?.length >= 4)
    .oneOf([yup.ref('newPassword'), null], 'Пароли должны совпадать').required('Поле необходимо заполнить')
})

const PasswordChange = () => {
  const { dispatch } = useDispatch()

  const serverErrors = useSelector(state => state.authReducer?.configurations.passwordChangeError)
  const isChanged = useSelector(state => state.authReducer?.configurations.isPasswordChanged)
  const isPasswordChanging = useSelector(state => state.authReducer?.configurations.isPasswordChanging)

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: passwordChangeValidationSchema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      dispatch(userActions.changePassword(values, { resetForm }))
    }
  })

  const hasErrors = React.useMemo(() => {
    return formik.errors || null
  }, [formik])

  return (
    <form
      className={classes.form}
      onSubmit={formik.handleSubmit}
    >
      <BlockItem>
        <h4>Изменить пароль:</h4>
      </BlockItem>

      {serverErrors &&
        <BlockItem>
          <Alert severity='error'>
            {serverErrors.errors}
          </Alert>
        </BlockItem>
      }

      {isChanged &&
        <BlockItem>
          <Alert severity='success'>
            Пароль успешно изменен!
          </Alert>
        </BlockItem>
      }

      <BlockItem>
        <div className='row'>
          <div className='col-lg-4 col-12'>
            <FormControl fullWidth>
              <TextField
                disabled={!!isPasswordChanging}
                error={!!hasErrors?.oldPassword || serverErrors}
                name='oldPassword'
                placeholder='Старый пароль'
                type='password'
                value={formik.values.oldPassword}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors?.oldPassword}/>
            </FormControl>
          </div>

          <div className='col-lg-4 col-12'>
            <FormControl fullWidth>
              <TextField
                disabled={!!isPasswordChanging}
                error={!!hasErrors?.newPassword || serverErrors}
                name='newPassword'
                placeholder='Новый пароль'
                type='password'
                value={formik.values.newPassword}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors?.newPassword}/>
            </FormControl>
          </div>

          <div className='col-lg-4 col-12'>
            <FormControl fullWidth>
              <TextField
                disabled={!!isPasswordChanging}
                error={!!hasErrors?.newPasswordConfirm || serverErrors}
                name='newPasswordConfirm'
                placeholder='Новый пароль еще раз'
                type='password'
                value={formik.values.newPasswordConfirm}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.newPasswordConfirm}/>
            </FormControl>
          </div>
        </div>
      </BlockItem>

      <div className='row'>
        <div className='col-lg-5 col-12'>
          <Button
            color='primary'
            disabled={!!isPasswordChanging}
            fullWidth
            type='submit'
            variant='big'
          >
            {isPasswordChanging ? 'Подождите..' : 'Изменить пароль' }
          </Button>
        </div>
      </div>
    </form>
  )
}

const ContactsChangeValidationSchema = yup.object({
  email: yup.string().email('Данные введены не корректно').required('Поле необходимо заполнить'),
  phoneNumber: yup.string()
    .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/, 'Введите номер полностью')
    .required('Поле необходимо заполнить')
})

const ContactsChange = () => {
  const { dispatch } = useDispatch()

  const serverErrors = useSelector(state => state.authReducer?.configurations.phoneOrEmailChangeError)
  const isChanged = useSelector(state => state.authReducer?.configurations.isPhoneOrEmailChanged)
  const isChanging = useSelector(state => state.authReducer?.configurations.phoneOrEmailChanging)

  const phoneNumber = useSelector(state => state.authReducer.user?.data?.phone_number)
  const email = useSelector(state => state.authReducer.user?.data?.email)

  const initialValues = {
    email,
    phoneNumber
  }

  const formik = useFormik({
    initialValues,
    validationSchema: ContactsChangeValidationSchema,
    validateOnChange: false,
    onSubmit: values => dispatch(userActions.changeContacts(values))
  })

  const hasErrors = React.useMemo(() => {
    return formik.errors || null
  }, [formik])

  return (
    <form
      className={classes.form}
      onSubmit={formik.handleSubmit}
    >
      <BlockItem>
        <h4>Данные аккаунта:</h4>
      </BlockItem>

      {serverErrors &&
        <BlockItem>
          <Alert severity='error'>
            {serverErrors.errors}
          </Alert>
        </BlockItem>
      }

      {isChanged &&
        <BlockItem>
          <Alert severity='success'>
            Данные успешно изменены !
          </Alert>
        </BlockItem>
      }

      <BlockItem>
        <div className='row'>
          <div className='col-lg-4 col-12'>
            <FormControl fullWidth>
              <TextField
                disabled={!!isChanging}
                error={!!hasErrors.email}
                name='email'
                placeholder='Электронная почта'
                value={formik.values?.email}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.email}/>
            </FormControl>
          </div>

          <div className='col-lg-4 col-12'>
            <FormControl fullWidth>
              <OutlinedInput
                disabled={!!isChanging}
                error={!!hasErrors.phoneNumber}
                inputComponent={PhoneTextMask}
                name='phoneNumber'
                placeholder='Номер телефона'
                value={formik.values?.phoneNumber}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.phoneNumber}/>
            </FormControl>
          </div>
        </div>
      </BlockItem>

      <div className='row'>
        <div className='col-lg-5 col-12'>
          <Button
            color='primary'
            disabled={!!isChanging}
            fullWidth
            type='submit'
            variant='big'
          >
            {isChanging ? 'Подождите..' : 'Изменить пароль' }
          </Button>
        </div>
      </div>
    </form>
  )
}
