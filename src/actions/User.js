import { User } from 'records'

import request from 'axios'
import api from 'api'

export const setCurrentUser = user => {
  localStorage.setItem('auth_token', user.auth_token)
  request.defaults.headers.common['AUTH-TOKEN'] = user.auth_token

  return { type: 'AUTHENTICATE_USER', user: new User(user) }
}

export const authenticateUser = auth_token => {
  request.defaults.headers.common['AUTH-TOKEN'] = auth_token

  return async function (dispatch) {
    let { data } = await request.get(api.me())
    return dispatch(setCurrentUser(data))
  }
}

export const updateUser = (user, data) => async dispatch => {
  let response = await request.put(api.user(user.id), { user: data})
  return dispatch(setCurrentUser(response.data))
}

export const logoutUser = () => {
  localStorage.removeItem('auth_token')
  return { type: 'RESET_STATE'}
}
