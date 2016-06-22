import { User } from 'records'

import request from 'axios'
import api from 'api'

export const setCurrentUser = user => {
  window.localStorage.setItem('auth_token', user.auth_token)
  request.defaults.headers.common['AUTH-TOKEN'] = user.auth_token

  return { type: 'AUTHENTICATE_USER', user: new User(user) }
}

export const authenticateUser = authToken => {
  request.defaults.headers.common['AUTH-TOKEN'] = authToken

  return async function (dispatch) {
    const { data } = await request.get(api.me())

    return data
      ? dispatch(setCurrentUser(data))
      : dispatch(logoutUser())
  }
}

export const updateUser = (user, data) => async dispatch => {
  const response = await request.put(api.user(user.id), { user: data })
  return dispatch(setCurrentUser(response.data))
}

export const logoutUser = () => {
  window.localStorage.removeItem('auth_token')
  return { type: 'RESET_STATE' }
}
