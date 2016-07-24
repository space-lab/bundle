import { combineReducers } from 'redux'
import { List, Map } from 'immutable'

export default combineReducers({
  byId: usersReducer,
  current: currentUserReducer,
  autocomplete: userAutocompleteReducer
})

function currentUserReducer (state = null, action) {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return state = action.id

    default:
      return state
  }
}

function usersReducer (state = Map(), action) {
  switch (action.type) {
    case 'RECEIVE_USER':
      return state.set(action.user.id, action.user)

    case 'RECEIVE_USERS':
      action.users.forEach(user =>
        state = state.set(user.id, user))

      return state

    default:
      return state
  }
}

function userAutocompleteReducer (state = List(), action) {
  switch (action.type) {
    case 'RECEIVE_AUTOCOMPLETE_USERS':
      return action.users

    case 'RESET_AUTOCOMPLETE_USERS':
      return List()

    default:
      return state
  }
}
