import React from 'react'
import { useFormik } from 'formik'
import { TextField, FormControl, Select, MenuItem } from '@material-ui/core'
import { useFetch, useNotifications } from '@app/lib'
import { royalApi } from '@app/services'
import { Button, ErrorText } from '@app/ui'
import { useDispatch, userActions } from '@app/store'
import yup from '@app/lib/yup'

import classes from './style.module.scss'

const validationSchema = yup.object().shape({
  department: yup.number().required(),
  request: yup.string().required(),
  email: yup.string().email().required()
})

export const SupportTab = () => {
  const { dispatch } = useDispatch()
  const { showSuccessMessage } = useNotifications()
  const { fetch, data: response } = useFetch({ fetchFn: royalApi.getDepartments, initialValue: null })

  const initialValues = {
    department: '',
    request: '',
    email: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(userActions.createRequest({
        data: values,
        onSuccess: () => showSuccessMessage('Заявка успешно отправлена'),
        resetForm: formik.resetForm()
      }))
    },
    validateOnChange: false
  })

  React.useEffect(() => {
    fetch({})
  }, [fetch])

  const departments = React.useMemo(() => {
    return response?.data?.data
  }, [response])

  const hasErrors = React.useMemo(() => {
    return formik.errors || null
  }, [formik])

  return (
    <>
      <h3>Техническая поддержка</h3>

      <form
        className={classes.form}
        onSubmit={formik.handleSubmit}
      >
        <div className='form-row row'>
          <div className='col-lg-4'>
            <span className={classes.inputLabel}>Отдел</span>
            <FormControl
              fullWidth
              variant='outlined'
            >
              <Select
                error={!!hasErrors.department}
                name='department'
                value={formik.values.department}
                onChange={formik.handleChange}
              >
                {departments?.map((department, index) =>
                  <MenuItem
                    key={index}
                    value={department.id}
                  >
                    {department.name}
                  </MenuItem>
                )}
              </Select>
              <ErrorText message={hasErrors.department}/>
            </FormControl>
          </div>

          <div className='col-lg-4'>
            <span className={classes.inputLabel}>Почта для ответа</span>
            <FormControl fullWidth>
              <TextField
                error={!!hasErrors.email}
                name='email'
                value={formik.values.email}
                variant='outlined'
                onChange={formik.handleChange}
              />
              <ErrorText message={hasErrors.email}/>
            </FormControl>
          </div>
        </div>

        <div className='form-row row'>
          <div className='col-lg-8'>
            <span className={classes.inputLabel}>Сообщение</span>
            <FormControl
              fullWidth
            >
              <TextField
                error={!!hasErrors.request}
                multiline
                name='request'
                rows={5}
                value={formik.values.request}
                variant='outlined'
                onChange={formik.handleChange}
              />
              <ErrorText message={hasErrors.request}/>
            </FormControl>
          </div>
        </div>

        <div className={classes.button}>
          <Button
            color='primary'
            fullWidth
            type='submit'
            variant='big'
          >
            задать вопрос
          </Button>
        </div>
      </form>
    </>
  )
}
