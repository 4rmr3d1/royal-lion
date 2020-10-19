import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Alert } from '@material-ui/lab'
import { TextField, Select, MenuItem, FormControl, OutlinedInput } from '@material-ui/core'
import { useDispatch, useSelector, userActions } from '@app/store'
import { useNotifications } from '@app/lib'
import { Button, ErrorText, PhoneTextMask, DateBirthTextMask } from '@app/ui'

import classes from './style.module.scss'

const validationSchema = yup.object({
  firstName: yup.string()
    .required('Поле необходимо для заполнения'),
  secondName: yup.string()
    .required('Поле необходимо для заполнения'),
  email: yup.string()
    .email()
    .required('Поле необходимо для заполнения'),
  dateBirth: yup.string()
    .matches(/^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/)
    .required('Поле необходимо для заполнения')
    .typeError('Введите корректное значение'),
  phoneNumber: yup.string()
    .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/, 'Введите номер полностью')
    .required('Поле необходимо для заполнения'),
  gender: yup.number()
    .min(1, 'Выберите пол')
    .max(2, 'Выберите пол')
    .required(),
  city: yup.string()
    .required('Поле необходимо для заполнения'),
  username: yup.string()
    .required('Поле необходимо для заполнения'),
  password1: yup.string()
    .required('Поле необходимо для заполнения'),
  password2: yup.string()
    .oneOf([yup.ref('password1'), null], 'Пароли должны совпадать')
    .required('Поле необходимо для заполнения')
})

export const Registration = () => {
  const { dispatch } = useDispatch()
  const { showSuccessMessage } = useNotifications()

  const serverErrors = useSelector(state => state.authReducer.registration?.error)
  const registrating = useSelector(state => state.authReducer.registration.registrating)

  const initialValues = {
    firstName: '',
    secondName: '',
    email: '',
    dateBirth: '',
    phoneNumber: '',
    gender: 0,
    city: '',
    username: '',
    password1: '',
    password2: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(userActions.register({
        user: values,
        onSuccess: () => showSuccessMessage('Вы успешно зарегистрировались!'),
        resetForm: () => formik.resetForm()
      }))
    },
    validateOnChange: false
  })

  const onAuthModalOpen = React.useCallback(() => {
    dispatch({ type: '@USER/change-property', payload: { authModalVisible: true } })
  })

  const hasErrors = React.useMemo(() => {
    return formik.errors || null
  }, [formik])

  React.useEffect(() => { document.title = 'Royal Lion | Линия' }, [])

  return (
    <section className={classes.registration}>
      <div className={`row justify-content-between ${classes.title}`}>
        <div className='col-12 col-lg-auto'>
          <h3>Регистрация</h3>
        </div>
        <div className='col-12 col-lg-auto'>
          <a
            href='#'
            onClick={onAuthModalOpen}
          >
            Уже есть аккаунт?
          </a>
        </div>
      </div>

      {serverErrors?.length > 0 && (
        <div className={classes.alertInfo}>
          <Alert severity='error'>
            {serverErrors}
          </Alert>
        </div>
      )}

      <form
        className={classes.form}
        onSubmit={formik.handleSubmit}
      >
        <div className='form-row row'>
          <div className='col-12'>
            <h4>Персональные данные:</h4>
          </div>
        </div>

        <div className='form-row row'>
          <div className='col-md-4'>
            <FormControl fullWidth>
              <TextField
                disabled={registrating}
                error={!!hasErrors.firstName || serverErrors?.first_name}
                name='firstName'
                placeholder={'Ваше имя'}
                value={formik.values.firstName || ''}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.firstName || serverErrors?.first_name}/>
            </FormControl>
          </div>

          <div className='col-md-4'>
            <FormControl fullWidth>
              <TextField
                disabled={registrating}
                error={!!hasErrors.email || serverErrors?.email}
                name='email'
                placeholder='Ваш e-mail'
                type='email'
                value={formik.values.email}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.email || serverErrors?.email}/>
            </FormControl>
          </div>

          <div className='col-md-4'>
            <FormControl fullWidth>
              <OutlinedInput
                disabled={registrating}
                error={!!hasErrors.dateBirth || serverErrors?.date_birth}
                inputComponent={DateBirthTextMask}
                name='dateBirth'
                placeholder='Ваша дата рождения'
                value={formik.values.dateBirth}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.dateBirth || serverErrors?.date_birth}/>
            </FormControl>
          </div>
        </div>

        <div className='form-row row'>
          <div className='col-md-4'>
            <FormControl fullWidth>
              <TextField
                disabled={registrating}
                error={!!hasErrors.secondName || serverErrors?.second_name}
                name='secondName'
                placeholder='Ваша фамилия'
                value={formik.values.secondName}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.secondName || serverErrors?.second_name}/>
            </FormControl>
          </div>

          <div className='col-md-4'>
            <FormControl fullWidth>
              <OutlinedInput
                disabled={registrating}
                error={!!hasErrors.phoneNumber || serverErrors?.phone_number}
                inputComponent={PhoneTextMask}
                name='phoneNumber'
                placeholder='Ваш номер телефона'
                value={formik.values.phoneNumber}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.phoneNumber || serverErrors?.phone_number}/>
            </FormControl>
          </div>

          <div className='col-md-4'>
            <div className={classes.selectContainer}>
              <FormControl
                fullWidth
                variant='outlined'
              >
                <Select
                  error={!!hasErrors.gender || serverErrors?.gender}
                  name='gender'
                  style={
                    formik.values.gender === 0
                      ? { color: 'rgba(147, 154, 158, 0.8)' }
                      : { undefined }
                  }
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <MenuItem
                    style={{ display: 'none' }}
                    value={'0'}
                  >
                      Ваш пол
                  </MenuItem>
                  <MenuItem value={'1'}>Мужской</MenuItem>
                  <MenuItem value={'2'}>Женский</MenuItem>
                </Select>

                <ErrorText message={hasErrors.gender || serverErrors?.gender}/>
              </FormControl>
            </div>
          </div>
        </div>

        <div className='form-row row'>
          <div className='col-md-4'>
            <FormControl fullWidth>
              <TextField
                disabled={registrating}
                error={!!hasErrors.city || serverErrors?.city}
                name='city'
                placeholder='Город проживания'
                value={formik.values.city}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.city || serverErrors?.city}/>
            </FormControl>
          </div>
        </div>

        <div className='form-row row'>
          <div className='col-12'>
            <h4>Данные для входа:</h4>
          </div>
        </div>

        <div className='form-row row'>
          <div className='col-md-4'>
            <FormControl fullWidth>
              <TextField
                disabled={registrating}
                error={!!hasErrors.username || serverErrors?.username}
                name='username'
                placeholder='Логин для входа на сайт'
                value={formik.values.username}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.username || serverErrors?.username}/>
            </FormControl>
          </div>

          <div className='col-md-4'>
            <FormControl fullWidth>
              <TextField
                disabled={registrating}
                error={!!hasErrors.password1 || serverErrors?.password1}
                name='password1'
                placeholder='Пароль'
                type='password'
                value={formik.values.password1}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.password1 || serverErrors?.password1}/>
            </FormControl>
          </div>

          <div className='col-md-4'>
            <FormControl fullWidth>
              <TextField
                disabled={registrating}
                error={!!hasErrors.password2 || serverErrors?.password2}
                name='password2'
                placeholder='Повторите пароль'
                type='password'
                value={formik.values.password2}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.password2 || serverErrors?.password2}/>
            </FormControl>
          </div>
        </div>

        <div className='form-row row align-items-center'>
          <div className='col-md-4'>
            <Button
              color='primary'
              disabled={registrating}
              fullWidth
              type="submit"
              variant='big'
            > Зарегистрироваться </Button>
          </div>

          <div className='col-md-4'>
            <p className={classes.agree}>
                Нажимая на кнопку вы <a href='/policy.pdf'>соглашаетесь</a> с <a href='/rules.pdf'>правилами</a>{' '}
              <span>обработки данных</span>{' '}
            </p>
          </div>
        </div>
      </form>
    </section>
  )
}
