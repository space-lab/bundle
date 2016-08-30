import request from 'axios'
import Cookie from 'js-cookie'
import { User } from 'records'
import { fromJS } from 'immutable'
import api from 'api'

export const setCurrentUser = user => {
  Cookie.set('auth_token', user.auth_token)
  request.defaults.headers.common['AUTH-TOKEN'] = user.auth_token

  return (dispatch) => {
    dispatch({ type: 'RECEIVE_USER', user: new User(user) })
    dispatch({ type: 'AUTHENTICATE_USER', id: user.id })
  }
}

export const authenticateUser = authToken => {
  request.defaults.headers.common['AUTH-TOKEN'] = authToken

  return async (dispatch) => {
    let { data } = await request.get(api.me())

    return data
      ? dispatch(setCurrentUser(data))
      : dispatch(logoutUser())
  }
}

export const updateUser = (user, payload) => async dispatch => {
  let { data } = await request.put(api.user(user.id), { user: payload })
  return dispatch(setCurrentUser(data))
}

export const logoutUser = () => {
  Cookie.delete('auth_token')
  return { type: 'RESET_STATE' }
}

export const getAutocompleteUsers = query => async dispatch => {
  let { data } = await request.get(api.searchUsers(query))
  let users = fromJS(data).map(user => new User(user))

  dispatch({ type: 'RECEIVE_AUTOCOMPLETE_USERS', users })
}

export const resetAutocompleteUsers = () => ({
  type: 'RESET_AUTOCOMPLETE_USERS'
})
