import { reduceBundle } from 'helpers'
import { normalize, arrayOf } from 'normalizr'
import { fromJS, Map } from 'immutable'
import { Share, User } from 'records'
import * as Schemas from 'normalizers'
import request from 'axios'
import api from 'api'

export const changeSharePermission = (id, type, permissionId) => async dispatch => {
  let url = type === 'share' ? api.shares(id) : api.invites(id)
  let payload = { permission_id: permissionId }

  const { data } = await request.put(url, payload)
  const result = fromJS(normalize(data, Schemas.share).entities)
    .update('users', users => users || Map())
    .update('shares', shares => shares || Map())

  const users = result.get('users').valueSeq().map(item => new User(item))
  const shares = result.get('shares').valueSeq().map(item => new Share(item))

  dispatch({ type: 'RECEIVE_USERS', users })
  dispatch({ type: 'RECEIVE_SHARES', shares })
}

export const inviteUsers = (resource, id, payload) => async dispatch => {
  let type = resource === 'Bundle'
    ? 'ADD_SHARES_TO_BUNDLE'
    : 'ADD_SHARES_TO_COLLECTION'

  const { data } = await request.post(api.invite(resource, id), payload)
  const result = fromJS(normalize(data, arrayOf(Schemas.share)).entities)
    .update('users', users => users || Map())
    .update('shares', shares => shares || Map())

  const users = result.get('users').valueSeq().map(item => new User(item))
  const shares = result.get('shares').valueSeq().map(item => new Share(item))

  dispatch({ type: 'RECEIVE_USERS', users })
  dispatch({ type: 'RECEIVE_SHARES', shares })
  dispatch({ type, resourceId: id, shares: shares.map(share => share.id) })
}

export const removeShare = (id, type, resourceId) => async dispatch => {
  let url = type === 'share' ? api.shares(id) : api.invites(id)
  await request.delete(url)

  dispatch({ type: 'REMOVE_SHARE', id, resourceId })
}

export const leaveShare = (id, resourceId, resourceType) => async dispatch => {
  await request.delete(api.shares(id))

  if (resourceType == 'Bundle') dispatch({ type: 'REMOVE_BUNDLE', id: resourceId })
  if (resourceType == 'Collection') dispatch({ type: 'REMOVE_COLLECTION', id: resourceId })

  dispatch({ type: 'REMOVE_SHARE', id, resourceId })
}

export const changeUrlPermission = (resourceName, resourceId, permission) => async dispatch => {
  await request.put(api.urlShare(resourceName.toLowerCase(), resourceId), {
    permission_id: permission
  })

  let ACTION = resourceName === 'Bundle'
    ? 'CHANGE_BUNDLE_SHARE_URL_PERMISSION'
    : 'CHANGE_COLLECTION_SHARE_URL_PERMISSION'

  dispatch({ type: ACTION, resourceId, permission })
}

export const joinUrlShare = (resource, id) => async dispatch => {
  let { data } = await request.post(api.joinUrlShare(resource, id))
  reduceBundle(data, dispatch)
}

export const getResource = (resource, id, token) => async dispatch => {
  let { data } = await request.get(api.urlShareResource(resource, id, token))
  reduceBundle(data, dispatch)
}
