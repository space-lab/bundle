import request from 'axios'
import { normalize, arrayOf } from 'normalizr'
import { fromJS } from 'immutable'

import { Share, User } from 'records'
import { shareSchema } from 'normalizers'
import api from 'api'

export const changeSharePermission = (id, type, permissionId) => async dispatch => {
  let url = type == 'share' ? api.shares(id) : api.invites(id)
  let payload = { permission_id: permissionId }

  let response = await request.put(url, payload)
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

export const inviteUsers = (resource, id, payload) => async dispatch => {
  let response = await request.post(api.invite(resource, id), payload)
  let result = fromJS(normalize(response.data, arrayOf(shareSchema)).entities)

  if (result.get('users')) {
    let users = result.get('users').valueSeq().map(item => new User(item))
    dispatch({ type: 'RECEIVE_USERS', users })
  }

  if (result.get('shares')) {
    let shares = result.get('shares').valueSeq().map(item => new Share(item))
    let shareIds = shares.map(share => share.id)
    let type = (resource == 'Bundle') ? 'ADD_SHARES_TO_BUNDLE' :  'ADD_SHARES_TO_COLLECTION'

    dispatch({ type: 'RECEIVE_SHARES', shares })
    dispatch({ type, shares: shareIds, resourceId: id })
  }
}

export const removeShare = (id, type, resourceId) => async dispatch => {
  let url = type == 'share' ? api.shares(id) : api.invites(id)
  let response = await request.delete(url)

  dispatch({ type: 'REMOVE_SHARE', id, resourceId })
}
