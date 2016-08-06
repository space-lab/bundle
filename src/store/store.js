import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { enableBatching } from 'redux-batched-actions'
import rootReducer from 'reducers'
import thunk from 'redux-thunk'
import errorHandler from './middlewares/errorHandler'
import logger from './middlewares/logger'

const middlewares =  [errorHandler, thunk]

if (process.env.NODE_ENV !== 'production' && localStorage.getItem('logger') === 'true') {
  middlewares.push(logger)
}

export const store = createStore(enableBatching(rootReducer), {}, applyMiddleware(...middlewares))
export const history = syncHistoryWithStore(browserHistory, store)
