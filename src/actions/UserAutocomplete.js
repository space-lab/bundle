import request from 'axios'
import api from 'api'
import { fromJS } from 'immutable'
import { UserAutocomplete } from 'records'

export const getAutocompleteUsers = query => async dispatch => {
  const { data } = await request.get(api.searchUsers(query))
  let users = fromJS(data).map(user => new UserAutocomplete(user))

  dispatch({ type: 'RECEIVE_AUTOCOMPLETE_USERS', users })
}

export const resetAutocompleteUsers = () => ({
  type: 'RESET_AUTOCOMPLETE_USERS'
})
