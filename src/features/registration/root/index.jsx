import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { TextField, Select, MenuItem, FormControl, OutlinedInput } from '@material-ui/core'
import { useDispatch, userActions } from '@app/store'
import { Button, ErrorText, PhoneTextMask, DateBirthTextMask } from '@app/ui'

import classes from './style.module.scss'

const validationSchema = yup.object({
  firstName: yup.string().required('Поле необходимо заполнить'),
  secondName: yup.string().required('Поле необходимо заполнить'),
  email: yup.string().email('Данные введены не корректно').required('Поле необходимо заполнить'),
  dateBirth: yup.date().required('Поле необходимо заполнить').typeError('Введите корректное значение'),
  phoneNumber: yup.string().matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/, 'Введите номер полностью').required('Поле необходимо заполнить'),
  gender: yup.number().min(1, 'Выберите пол').max(2, 'Выберите пол').required('Поле необходимо заполнить'),
  city: yup.string().required('Поле необходимо заполнить'),
  username: yup.string().required('Поле необходимо заполнить'),
  password1: yup.string().required('Поле необходимо заполнить'),
  password2: yup.string().oneOf([yup.ref('password1'), null], 'Пароли должны совпадать').required()
})
export const Registration = () => {
  const { dispatch } = useDispatch()
  const initialValues = {
    firstName: '',
    secondName: '',
    email: '',
    dateBirth: '    -  -  ',
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
    onSubmit: values => dispatch(userActions.register(values)),
    validateOnChange: false
  })

  const hasErrors = React.useMemo(() => {
    return formik.errors || null
  }, [formik])

  return (
    <section className={classes.registration}>
      <div className='container'>
        <div className={`row justify-content-between ${classes.title}`}>
          <div className='col-auto'>
            <h3>Регистрация</h3>
          </div>
          <div className='col-auto'>
            <a href='#'>Уже есть аккаунт?</a>
          </div>
        </div>
        <form
          className='form'
          onSubmit={formik.handleSubmit}
        >
          <div className='form-row row'>
            <div className='col-12'>
              <h4>Персональные данные:</h4>
            </div>
          </div>
          <div className='form-row row'>
            <div className='col-lg-4'>
              <FormControl fullWidth>
                <TextField
                  error={!!hasErrors.firstName}
                  name='firstName'
                  placeholder={'Ваше имя'}
                  value={formik.values.firstName}
                  variant='outlined'
                  onChange={formik.handleChange}
                />
                <ErrorText message={hasErrors.firstName}/>
              </FormControl>
            </div>
            <div className='col-lg-4'>
              <FormControl fullWidth>
                <TextField
                  error={!!hasErrors.email}
                  name='email'
                  placeholder='Ваш e-mail'
                  type='email'
                  value={formik.values.email}
                  variant='outlined'
                  onChange={formik.handleChange}
                />
                <ErrorText message={hasErrors.email}/>
              </FormControl>
            </div>
            <div className='col-lg-4'>
              <FormControl fullWidth>
                <OutlinedInput
                  error={!!hasErrors.dateBirth}
                  inputComponent={DateBirthTextMask}
                  name='dateBirth'
                  placeholder='Ваша дата рождения'
                  value={formik.values.dateBirth}
                  variant='outlined'
                  onChange={formik.handleChange}
                />
                <ErrorText message={hasErrors.dateBirth}/>
              </FormControl>
            </div>
          </div>
          <div className='form-row row'>
            <div className='col-lg-4'>
              <FormControl fullWidth>
                <TextField
                  error={!!hasErrors.secondName}
                  name='secondName'
                  placeholder='Ваша фамилия'
                  value={formik.values.secondName}
                  variant='outlined'
                  onChange={formik.handleChange}
                />
                <ErrorText message={hasErrors.secondName}/>
              </FormControl>
            </div>
            <div className='col-lg-4'>
              <FormControl fullWidth>
                <OutlinedInput
                  error={!!hasErrors.phoneNumber}
                  inputComponent={PhoneTextMask}
                  name='phoneNumber'
                  placeholder='Ваш номер телефона'
                  value={formik.values.phoneNumber}
                  variant='outlined'
                  onChange={formik.handleChange}
                />
                <ErrorText message={hasErrors.phoneNumber}/>
              </FormControl>
            </div>
            <div className='col-lg-4'>
              <div className={classes.selectContainer}>
                <FormControl
                  fullWidth
                  variant='outlined'
                >
                  <Select
                    error={!!hasErrors.gender}
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
                  <ErrorText message={hasErrors.gender}/>
                </FormControl>
              </div>
            </div>
          </div>
          <div className='form-row row'>
            <div className='col-lg-4'>
              <FormControl fullWidth>
                <TextField
                  error={!!hasErrors.city}
                  name='city'
                  placeholder='Город проживания'
                  value={formik.values.city}
                  variant='outlined'
                  onChange={formik.handleChange}
                />
                <ErrorText message={hasErrors.city}/>
              </FormControl>
            </div>
          </div>
          <div className='form-row row'>
            <div className='col-12'>
              <h4>Данные для входа:</h4>
            </div>
          </div>
          <div className='form-row row'>
            <div className='col-lg-4'>
              <FormControl fullWidth>
                <TextField
                  error={!!hasErrors.username}
                  name='username'
                  placeholder='Логин для входа на сайт'
                  value={formik.values.username}
                  variant='outlined'
                  onChange={formik.handleChange}
                />
                <ErrorText message={hasErrors.username}/>
              </FormControl>
            </div>
            <div className='col-lg-4'>
              <FormControl fullWidth>
                <TextField
                  error={!!hasErrors.password1}
                  name='password1'
                  placeholder='Пароль'
                  type='password'
                  value={formik.values.password1}
                  variant='outlined'
                  onChange={formik.handleChange}
                />
                <ErrorText message={hasErrors.password1}/>
              </FormControl>
            </div>
            <div className='col-lg-4'>
              <FormControl fullWidth>
                <TextField
                  error={!!hasErrors.password2}
                  name='password2'
                  placeholder='Повторите пароль'
                  type='password'
                  value={formik.values.password2}
                  variant='outlined'
                  onChange={formik.handleChange}
                />
                <ErrorText message={hasErrors.password2}/>
              </FormControl>
            </div>
          </div>
          <div className='form-row row align-items-center'>
            <div className='col-lg-4'>
              <Button
                type="submit"
                variant='big'
              > Зарегистрироваться </Button>
            </div>
            <div className='col-lg-3'>
              <p className='agree'>
                Нажимая на кнопку вы соглашаетесь с правилами{' '}
                <span>обработки данных</span>{' '}
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
