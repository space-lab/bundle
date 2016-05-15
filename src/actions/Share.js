import { fromJS } from 'immutable'
import { Share, User } from '../records'
import { shareSchema } from '../normalizers'
import { normalize } from 'normalizr'
import request from 'axios'
import api from './../api'

export function changeSharePermission (shareId, permissionId) {
  return async function (dispatch) {
    let payload = { permission_id: permissionId }
    let response = await request.put(api.shares(shareId), payload)
    let result = fromJS(normalize(response.data, shareSchema).entities)


    let users = result.get('users').valueSeq().map(item => new User(item))
    let shares = result.get('shares').valueSeq().map(item => new Share(item))

    dispatch({ type: 'RECEIVE_USERS', users })
    dispatch({ type: 'RECEIVE_SHARES', shares })
  }
}

export function inviteUsers (resource, id, payload) {
  return async function (dispatch) {
    let response = await request.post(api.invite(resource, id), payload)
    let result = fromJS(normalize(response.data, shareSchema).entities)

    let users = result.get('users').valueSeq().map(item => new User(item))
    let shares = result.get('shares').valueSeq().map(item => new Share(item))

    dispatch({ type: 'RECEIVE_USERS', users })
    dispatch({ type: 'RECEIVE_SHARES', shares })
  }
}
