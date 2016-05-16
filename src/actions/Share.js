import { fromJS } from 'immutable'
import { Share, User } from '../records'
import { shareSchema } from '../normalizers'
import { normalize, arrayOf } from 'normalizr'
import request from 'axios'
import api from './../api'

export function changeSharePermission (shareId, permissionId) {
  return async function (dispatch) {
    let payload = { permission_id: permissionId }
    let response = await request.put(api.shares(shareId), payload)
    let result = fromJS(normalize(response.data, shareSchema).entities)

    if (result.get('users')) {
      let users = result.get('users').valueSeq().map(item => new User(item))
      dispatch({ type: 'RECEIVE_USERS', users })
    }

    if (result.get('shares')) {
      let shares = result.get('shares').valueSeq().map(item => new Share(item))
      dispatch({ type: 'RECEIVE_SHARES', shares })
    }
  }
}

export function inviteUsers (resource, id, payload) {
  return async function (dispatch) {
    let response = await request.post(api.invite(resource, id), payload)
    let result = fromJS(normalize(response.data, arrayOf(shareSchema)).entities)

    if (result.get('users')) {
      let users = result.get('users').valueSeq().map(item => new User(item))
      dispatch({ type: 'RECEIVE_USERS', users })
    }

    if (result.get('shares')) {
      let shares = result.get('shares').valueSeq().map(item => new Share(item))
      let shareIds = shares.map(share => share.id)

      dispatch({ type: 'RECEIVE_SHARES', shares })
      dispatch({ type: 'ADD_SHARES_TO_BUNDLE', shares: shareIds, bundleId: id })
    }
  }
}
