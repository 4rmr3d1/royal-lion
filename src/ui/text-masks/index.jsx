import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'

export const PhoneTextMask = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      {...other}
      mask={[
        '+', '7', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/
      ]}
      placeholderChar={'\u2000'}
      ref={ref => { inputRef(ref ? ref.inputElement : null) }}
    />
  )
}

PhoneTextMask.propTypes = {
  inputRef: PropTypes.func.isRequired
}

export const DateBirthTextMask = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      {...other}
      mask={[
        /\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/
      ]}
      placeholderChar={'\u2000'}
      ref={ref => { inputRef(ref ? ref.inputElement : null) }}
    />
  )
}

DateBirthTextMask.propTypes = {
  inputRef: PropTypes.func.isRequired
}
