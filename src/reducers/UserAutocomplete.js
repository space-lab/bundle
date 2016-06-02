import { List } from 'immutable'

export default function (state = List(), action) {
  switch (action.type) {
    case 'RECEIVE_AUTOCOMPLETE_USERS':
      return action.users
    case 'RESET_AUTOCOMPLETE_USERS':
      return List()
    default:
      return state
  }
}
