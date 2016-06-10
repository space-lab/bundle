import request from 'axios'
import { normalize, arrayOf } from 'normalizr'
import { fromJS } from 'immutable'

import { Share, User } from 'records'
import { shareSchema } from 'normalizers'
import api from 'api'

export const changeSharePermission = (id, type, permissionId) => async dispatch => {
  const url = type == 'share' ? api.shares(id) : api.invites(id)
  const payload = { permission_id: permissionId }

  const response = await request.put(url, payload)
  const result = fromJS(normalize(response.data, shareSchema).entities)

  if (result.get('users')) {
    const users = result.get('users').valueSeq().map(item => new User(item))
    dispatch({ type: 'RECEIVE_USERS', users })
  }

  if (result.get('shares')) {
    const shares = result.get('shares').valueSeq().map(item => new Share(item))
    dispatch({ type: 'RECEIVE_SHARES', shares })
  }
}

export const inviteUsers = (resource, id, payload) => async dispatch => {
  const response = await request.post(api.invite(resource, id), payload)
  const result = fromJS(normalize(response.data, arrayOf(shareSchema)).entities)

  if (result.get('users')) {
    const users = result.get('users').valueSeq().map(item => new User(item))
    dispatch({ type: 'RECEIVE_USERS', users })
  }

  if (result.get('shares')) {
    const shares = result.get('shares').valueSeq().map(item => new Share(item))
    const shareIds = shares.map(share => share.id)
    const type = (resource == 'Bundle') ? 'ADD_SHARES_TO_BUNDLE' :  'ADD_SHARES_TO_COLLECTION'

    dispatch({ type: 'RECEIVE_SHARES', shares })
    dispatch({ type, shares: shareIds, resourceId: id })
  }
}

export const removeShare = (id, type, resourceId) => async dispatch => {
  const url = type == 'share' ? api.shares(id) : api.invites(id)
  const response = await request.delete(url)

  dispatch({ type: 'REMOVE_SHARE', id, resourceId })
}

export const getShareUrl = (resourceName, resourceId) => async dispatch => {
  console.log(resourceName)
  const url = 'http://bundle.spacelab.team/something-url/join'
  const ACTION = resourceName === 'Bundle'
    ? 'RECEIVE_BUNDLE_SHARE_URL'
    : 'RECEIVE_COLLECTION_SHARE_URL'

  dispatch({ type: ACTION, resourceId, url })
}
