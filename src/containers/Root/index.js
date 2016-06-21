import { Provider } from 'react-redux'

import Routes from 'routes'
import { store } from 'store/store'
import { Share } from 'containers'

export default function Root () {
  return (
    <Provider store={store}>
      <div className='root-container'>
        {Routes}
      </div>
    </Provider>
  )
}
