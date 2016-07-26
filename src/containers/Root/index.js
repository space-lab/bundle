import { Provider } from 'react-redux'
import { store } from 'store/store'
import Routes from 'routes'

export default function Root () {
  return (
    <Provider store={store}>
      <div className='root-container'>
        {Routes}
      </div>
    </Provider>
  )
}
