import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Поле необходимо заполнить'
  },
  string: {
    email: 'Данные введены не корректно'
  }
})

export default yup
