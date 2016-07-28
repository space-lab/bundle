import { Provider } from 'react-redux'
import { store } from 'store/store'
import { render } from 'react-dom'
import Routes from 'routes'
import 'style.css'

render(
  <Provider store={store}>
    {Routes}
  </Provider>,
  document.getElementById('app')
)
