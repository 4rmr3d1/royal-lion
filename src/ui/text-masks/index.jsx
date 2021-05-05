import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

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

export const BankCardTextMask = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      {...other}
      mask={[
        /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/
      ]}
      placeholderChar={'\u2000'}
      ref={ref => { inputRef(ref ? ref.inputElement : null) }}
    />
  )
}

BankCardTextMask.propTypes = {
  inputRef: PropTypes.func.isRequired
}

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  decimalSymbol: '.',
  allowDecimal: true,
  includeThousandsSeparator: false,
  decimalLimit: 2,
  allowNegative: false,
  allowLeadingZeroes: false
}

export const AmountTextMask = ({ inputRef, ...other }) => {
  const mask = createNumberMask(defaultMaskOptions)
  return (
    <MaskedInput
      {...other}
      mask={mask}
      placeholderChar={'\u2000'}
      ref={ref => { inputRef(ref ? ref.inputElement : null) }}
    />
  )
}

AmountTextMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
  inputMode: PropTypes.string,
  maskOptions: PropTypes.func
}
