import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { TextField, FormControl } from '@material-ui/core'
import { Block, BlockItem, Button, ErrorText } from '@app/ui'

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

const passwordChangeValidationSchema = yup.object({})

const PasswordChange = () => {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfim: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: passwordChangeValidationSchema,
    validateOnChange: false
  })

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
                name='oldPassword'
                type='password'
                value={formik.values.oldPassword}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText />
            </FormControl>
          </div>

          <div className='col-lg-4'>
            <FormControl>
              <TextField
                name='newPassword'
                type='password'
                value={formik.values.newPassword}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText />
            </FormControl>
          </div>

          <div className='col-lg-4'>
            <FormControl>
              <TextField
                name='newPasswordConfim'
                type='password'
                value={formik.values.newPasswordConfim}
                variant='outlined'
                onChange={formik.handleChange}
              />

              <ErrorText />
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

const ContactsChangeValidationSchema = yup.object({})

const ContactsChange = () => {
  const initialValues = {
    email: '',
    phoneNumber: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: ContactsChangeValidationSchema,
    validateOnChange: false
  })

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
                name='email'
                value={formik.values.email}
                variant='outline'
                onChange={formik.handleChange}
              />

              <ErrorText />
            </FormControl>
          </div>

          <div className='col-lg-4'>
            <FormControl>
              <TextField
                handleChange={formik.handleChange}
                name='phoneNumber'
                value={formik.values.phoneNumber}
                variant='outline'
              />

              <ErrorText />
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
