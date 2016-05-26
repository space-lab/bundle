import request from 'axios'
import api from 'api'

// TODO
// Normalize
// Immutable records

export function getUsers (value) {
  return async function (dispatch) {
    let response = await request.get(api.searchUsers(value))
    console.log(response)

    //dispatch({ type: 'RECEIVE_USERS', response })
  }
}
