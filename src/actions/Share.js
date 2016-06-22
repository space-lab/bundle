import request from 'axios'
import { normalize, arrayOf } from 'normalizr-immutable'
import * as Schemas from 'normalizers'
import api from 'api'

export const changeSharePermission = (id, type, permissionId) => async dispatch => {
  const url = type === 'share' ? api.shares(id) : api.invites(id)
  const payload = { permission_id: permissionId }

  const response = await request.put(url, payload)
  const result = normalize(response.data, Schemas.share).entities

  const users = result.get('users').toList()
  const shares = result.get('shares').toList()

  dispatch({ type: 'RECEIVE_USERS', users })
  dispatch({ type: 'RECEIVE_SHARES', shares })
}

export const inviteUsers = (resource, id, payload) => async dispatch => {
  const type = resource === 'Bundle'
    ? 'ADD_SHARES_TO_BUNDLE'
    : 'ADD_SHARES_TO_COLLECTION'

  const response = await request.post(api.invite(resource, id), payload)
  const result = normalize(response.data, arrayOf(Schemas.share)).entities

  const users = result.get('users').toList()
  const shares = result.get('shares').toList()

  dispatch({ type: 'RECEIVE_USERS', users })
  dispatch({ type: 'RECEIVE_SHARES', shares })
  dispatch({ type, resourceId: id, shares: shares.map(share => share.id) })
}

export const removeShare = (id, type, resourceId) => async dispatch => {
  const url = type === 'share' ? api.shares(id) : api.invites(id)
  await request.delete(url)

  dispatch({ type: 'REMOVE_SHARE', id, resourceId })
}

export const getShareUrl = (resourceName, resourceId) => async dispatch => {
  const response = await request.post(api.urlShare(resourceName.toLowerCase(), resourceId))
  const { share_url, share_url_permission } = response.data
  const ACTION = resourceName === 'Bundle'
    ? 'RECEIVE_BUNDLE_SHARE_URL'
    : 'RECEIVE_COLLECTION_SHARE_URL'

  dispatch({ type: ACTION, resourceId, share_url, share_url_permission })
}

export const changeUrlPermission = (resourceName, resourceId, permission) => async dispatch => {
  await request.put(api.urlShare(resourceName.toLowerCase(), resourceId), {
    permission_id: permission
  })

  const ACTION = resourceName === 'Bundle'
    ? 'CHANGE_BUNDLE_SHARE_URL_PERMISSION'
    : 'CHANGE_COLLECTION_SHARE_URL_PERMISSION'

  dispatch({ type: ACTION, resourceId, permission })
}

export const removeUrlShare = (resourceName, resourceId) => async dispatch => {
  await request.delete(api.urlShare(resourceName.toLowerCase(), resourceId))

  const ACTION = resourceName === 'Bundle'
    ? 'REMOVE_BUNDLE_SHARE_URL'
    : 'REMOVE_COLLECTION_SHARE_URL'

  dispatch({ type: ACTION, resourceId })
}
