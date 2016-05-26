import { Map } from 'immutable'

export default function (state = Map(), action) {
  switch (action.type) {
    case 'RECEIVE_USERS':
      return state
    default:
      return state
  }
}
