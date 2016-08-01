import { List } from 'immutable'
import { Bundle } from 'records'
import { reduceBundle, reduceBundles, getRecords } from 'helpers'
import request from 'axios'
import api from 'api'

export const createBundle = (payload = {}) => async dispatch => {
  const { data } = await request.post(api.bundle(), { bundle: payload })

  reduceBundle(data, dispatch)
  return data
}

export const getBundle = id => async dispatch => {
  const { data } = await request.get(api.bundle(id))
  reduceBundle(data, dispatch)
}

export const getBundles = page => async dispatch => {
  const { data } = await request.get(api.bundles(page))
  reduceBundles(data, dispatch)
}

export const removeBundle = (id) => async dispatch => {
  await request.delete(api.bundle(id))

  dispatch({ type: 'ROUTE_RESET_BUNDLE_ID', id })
  dispatch({ type: 'REMOVE_FAVORITE', id, resourceType: 'Bundle' })
  dispatch({ type: 'REMOVE_BUNDLE', id })
}

export const updateBundle = (id, payload) => async dispatch => {
  const { data } = await request.put(api.bundle(id), { bundle: payload })
  reduceBundle(data, dispatch)
}
