import { Provider } from 'react-redux'
import { store } from 'store/store'
import { render } from 'react-dom'
import Routes from 'routes'
import React from 'react'
import 'style.css'

if (process.env.NODE_ENV !== 'production' && localStorage.getItem('whyDidYouUpdate') === 'true') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React, { exclude: /^Connect/ })
}

render(
  <Provider store={store}>
    {Routes}
  </Provider>,
  document.getElementById('app')
)
