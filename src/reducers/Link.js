import { combineReducers } from 'redux'
import { Map } from 'immutable'

export default combineReducers({
  byId: linksReducer,
  current: currentLinkReducer
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
      return state.merge(action.links.toMap().mapKeys((k, v) => v.id))

    case 'UPDATE_LINK':
      return state.set(action.link.id, action.link)

    case 'REMOVE_LINK':
      return state.delete(action.id)

    default:
      return state
  }
}
