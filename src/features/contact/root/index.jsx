import React from 'react'
import { useFormik } from 'formik'
import { TextField, FormControl, OutlinedInput, useMediaQuery } from '@material-ui/core'
import { useNotifications } from '@app/lib'
import { Button, ErrorText, PhoneTextMask } from '@app/ui'
import { useDispatch, userActions } from '@app/store'
import yup from '@app/lib/yup'

import classes from './style.module.scss'

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string()
    .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/, 'Введите номер полностью')
    .required('Поле необходимо заполнить'),
  text: yup.string().required()
})

export const Contact = () => {
  const { dispatch } = useDispatch()
  const { showSuccessMessage } = useNotifications()
  const smBreakPoint = useMediaQuery('(max-width: 575px)')

  const initialValues = {
    name: '',
    phone: '',
    text: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(userActions.supportFeedback({
        data: values,
        onSuccess: () => showSuccessMessage('Вопрос успешно отправлен!'),
        resetForm: formik.resetForm()
      }))
    },
    validateOnChange: false
  })

  const hasErrors = React.useMemo(() => {
    return formik.errors || null
  }, [formik])

  return (
    <section className={classes.contact}>
      <div className='row'>
        <div className='col-lg-5'>
          <p className={classes.subtitle}>Обратная связь</p>
          <h2>Остались вопросы?</h2>
          {!smBreakPoint &&
            <p className={classes.text}>
              У вас остались вопросы или есть предложения по улучшению сервиса?
              Пишите нам на почту или в форме справа, наш менеджер вам ответит в
              ближайшее время
            </p>
          }

          <p className={classes.graffic}>
            Понедельник - Воскресенье: 8:00 - 22:00
          </p>

          <a
            href="https://vk.com/royal_bk"
          >
            <img
              alt="vk icon"
              src="https://royal-lion.bet/img/vk.svg"
            />
          </a>

          <div className={classes.contactEmail}>
            royalbet177@gmail.com
          </div>
        </div>
        <form
          className={`col-lg-6 ml-lg-auto ${classes.form}`}
          onSubmit={formik.handleSubmit}
        >
          <div className='row form-row'>
            <div className='col-lg-6'>
              <span className={classes.inputLabel}>Имя</span>
              <FormControl fullWidth>
                <TextField
                  error={!!hasErrors.name}
                  name='name'
                  value={formik.values.name}
                  variant='outlined'
                  onChange={formik.handleChange}
                />
                <ErrorText message={hasErrors.name}/>
              </FormControl>
            </div>
            <div className='col-lg-6'>
              <span className={classes.inputLabel}>Телефон</span>
              <FormControl fullWidth>
                <OutlinedInput
                  error={!!hasErrors.phone}
                  inputComponent={PhoneTextMask}
                  name='phone'
                  value={formik.values.phone}
                  variant='outlined'
                  onChange={formik.handleChange}
                />

                <ErrorText message={hasErrors.phone}/>
              </FormControl>
            </div>
          </div>
          <div className='row form-row'>
            <div className='col-lg-12'>
              <span className={classes.inputLabel}>Сообщение</span>
              <FormControl fullWidth>
                <TextField
                  error={!!hasErrors.text}
                  multiline
                  name='text'
                  rows={5}
                  value={formik.values.text}
                  variant='outlined'
                  onChange={formik.handleChange}
                />
                <ErrorText message={hasErrors.text}/>
              </FormControl>
            </div>
          </div>
          <div className='row form-row align-items-center'>
            <div className='col-lg-6'>
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
            </div>
            <div className='col-lg-6'>
              <div className={classes.agree}>
                Нажимая на кнопку вы соглашаетесь с правилами{' '}
                <span>обработки данных</span>{' '}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
