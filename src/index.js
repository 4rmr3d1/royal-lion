import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { enableES5 } from 'immer'
import { Provider as ReduxProvider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { createStore } from '@app/store'
import { App } from '@app/components'
import * as serviceWorker from './serviceWorker'

enableES5()
const { store } = createStore()

ReactDOM.render(
  <ReduxProvider store={store}>
    <IntlProvider locale='ru'>
      <App />
    </IntlProvider>
  </ReduxProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
