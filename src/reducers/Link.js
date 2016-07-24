import { combineReducers } from 'redux'
import { Map } from 'immutable'

export default combineReducers({
  current: currentLinkReducer,
  byId: linksReducer
})

function currentLinkReducer (state = Map(), action) {
  switch (action.type) {
    case 'SET_CURRENT_LINK':
      return state.set(action.bundleId, action.link)

    case 'CLEAR_CURRENT_LINK':
      return state.delete(action.bundleId)

    default:
      return state
  }
}

function linksReducer (state = Map(), action) {
  switch (action.type) {
    case 'RECEIVE_LINK':
      return state.set(action.link.id, action.link)

    case 'RECEIVE_LINKS':
      action.links.forEach(link =>
        state = state.set(link.id, link))

      return state

    case 'UPDATE_LINK':
      return state.set(action.link.id, action.link)

    case 'REMOVE_LINK':
      return state.delete(action.id)


    case 'UPDATE_LINK':
      return state.setIn([action.id, action.field], action.value)

    default:
      return state
  }
}
