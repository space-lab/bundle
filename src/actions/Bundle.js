import { List } from 'immutable'
import { Bundle, User, Link, Share } from 'records'
import { NEW_BUNDLE_ID } from 'constants'
import { reduceBundle, getRecords } from 'helpers'
import request from 'axios'
import api from 'api'

export const generateNewBundle = () => {
  const bundle = new Bundle({
    id: NEW_BUNDLE_ID,
    name: '',
    description: '',
    isNewBundle: true,
    links: List(),
  })

  return { type: 'SAVE_BUNDLE', bundle }
}

export const createBundle = payload => async dispatch => {
  const { data } = await request.post(api.bundles(), { bundle: payload })

  reduceBundle(data, NEW_BUNDLE_ID, dispatch)
  return data
}

export const getBundle = id => async dispatch => {
  const { data } = await request.get(api.bundles(id))
  reduceBundle(data, id, dispatch)
}

export const getBundles = () => async dispatch => {
  const { data } = await request.get(api.bundles())
  const bundles = getRecords(Bundle, data)

  dispatch({ type: 'RECEIVE_BUNDLES', bundles })
}

export const removeBundle = (id) => async dispatch => {
  await request.delete(api.bundles(id))

  dispatch({ type: 'ROUTE_RESET_BUNDLE_ID', id })
  dispatch({ type: 'REMOVE_FAVORITE', id, resourceType: 'Bundle' })
  dispatch({ type: 'REMOVE_BUNDLE', id })
}

export const updateBundle = (id, payload) => async (dispatch) => {
  const response = await request.put(api.bundles(id), { bundle: payload })
  reduceBundle(response.data, id, dispatch)
}

export const addCurrentLinkToBundle = (bundleId, link) => dispatch => {
  dispatch({ type: 'ADD_LINK_ID_TO_BUNDLE', linkId: link.get('id'), bundleId })
  dispatch({ type: 'RECEIVE_LINK', link })
  dispatch({ type: 'CLEAR_CURRENT_LINK', bundleId })
}

export const removeLinkFromBundle = (bundleId, index) => ({
  type: 'REMOVE_LINK_ID_FROM_BUNDLE', bundleId, index
})

export const updateBundleInfo = (bundleId, field, value) => ({
  type: 'UPDATE_BUNDLE_INFO', bundleId, field, value
})
