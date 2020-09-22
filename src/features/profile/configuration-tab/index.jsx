import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector, userActions } from '@app/store'
import { TextField, FormControl, OutlinedInput } from '@material-ui/core'
import { Block, BlockItem, Button, ErrorText, PhoneTextMask } from '@app/ui'

export const ConfigurationTab = () => {
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
  oldPassword: yup.string().length(4, 'Пароль должен содержать минимум 4 символа').required('Поле необходимо заполнить'),
  newPassword: yup.string().length(4, 'Пароль должен содержать минимум 4 символа').required('Поле необходимо заполнить'),
  newPasswordConfirm: yup.string().length(4, 'Пароль должен содержать минимум 4 символа').oneOf([yup.ref('newPassword'), null], 'Пароли должны совпадать').required('Поле необходимо заполнить')
})

const PasswordChange = () => {
  const { dispatch } = useDispatch()

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: passwordChangeValidationSchema,
    validateOnChange: false,
    onSubmit: values => dispatch(userActions.changePassword(values))
  })

  const hasErrors = React.useMemo(() => {
    return formik.errors || null
  }, [formik])

  return (
    <form
      className='form'
      onSubmit={formik.handleSubmit}
    >
      <BlockItem>
        <h4>Изменить пароль:</h4>
      </BlockItem>

      <BlockItem>
        <div className='row'>
          <div className='col-lg-4'>
            <FormControl>
              <TextField
                error={!!hasErrors?.oldPassword}
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

          <div className='col-lg-4'>
            <FormControl>
              <TextField
                error={!!hasErrors?.newPassword}
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

          <div className='col-lg-4'>
            <FormControl>
              <TextField
                error={!!hasErrors?.newPasswordConfirm}
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

      <Button
        type='submit'
        variant='big'
      >
        Изменить пароль
      </Button>
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
      className='form'
      onSubmit={formik.handleSubmit}
    >
      <BlockItem>
        <h4>Данные аккаунта:</h4>
      </BlockItem>

      <BlockItem>
        <div className='row'>
          <div className='col-lg-4'>
            <FormControl>
              <TextField
                error={!!hasErrors.email}
                name='email'
                placeholder='Электронная почта'
                value={formik.values.email}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.email}/>
            </FormControl>
          </div>

          <div className='col-lg-4'>
            <FormControl>
              <OutlinedInput
                error={!!hasErrors.phoneNumber}
                inputComponent={PhoneTextMask}
                name='phoneNumber'
                placeholder='Номер телефона'
                value={formik.values.phoneNumber}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText message={hasErrors.phoneNumber}/>
            </FormControl>
          </div>
        </div>
      </BlockItem>

      <Button
        type='submit'
        variant='big'
      >
        Сохранить
      </Button>
    </form>
  )
}
