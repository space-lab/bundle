import { combineReducers } from 'redux'
import { reducer as ui } from 'redux-ui'
import { routerReducer as routing } from 'react-router-redux'

import User from './User'
import Link from './Link'
import Alert from './Alert'
import Route from './Route'
import Share from './Share'
import Bundle from './Bundle'
import Search from './Search'
import Favorite from './Favorite'
import Collection from './Collection'
import UserAutocomplete from './UserAutocomplete'

const appReducer = combineReducers({
  ui,
  routing,
  Route,
  User,
  Link,
  Alert,
  Share,
  Bundle,
  Search,
  Favorite,
  Collection,
  UserAutocomplete
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
