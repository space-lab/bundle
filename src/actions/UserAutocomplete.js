import request from 'axios'
import api from 'api'
import { fromJS } from 'immutable'
import { UserAutocomplete } from 'records'

export function getAutocompleteUsers (value) {
  return async function (dispatch) {
    const response = await request.get(api.searchUsers(value))
    let users = fromJS(response.data).map(user => new UserAutocomplete(user))

    dispatch({ type: 'RECEIVE_AUTOCOMPLETE_USERS', users })
  }
}
export function resetAutocompleteUsers () {
  return { type: 'RESET_AUTOCOMPLETE_USERS' }
}
