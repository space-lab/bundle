import { fromJS } from 'immutable'
import { normalize, arrayOf } from 'normalizr'

import { Bundle, Collection, Share } from 'records'
import { collectionSchema } from 'normalizers'

import request from 'axios'
import api from 'api'

export function getCollection (id) {
  return async function (dispatch) {
    let response = await request.get(api.collections(id))
    let result = normalize(response.data, collectionSchema).entities
    let bundles = Object.values(result.bundles || []).map(item => new Bundle(fromJS(item)))
    let shares = Object.values(result.shares || []).map(item => new Share(fromJS(item)))
    let collections = Object.values(result.collections).map(item => new Collection(fromJS(item)))

    dispatch({ type: 'RECEIVE_BUNDLES', bundles })
    dispatch({ type: 'RECEIVE_COLLECTIONS', collections })
    dispatch({ type: 'RECEIVE_SHARES', shares })
  }
}

export function getCollections () {
  return async function (dispatch) {
    let response = await request.get(api.collections())
    let result = normalize(response.data, arrayOf(collectionSchema)).entities
    let shares = Object.values(result.shares || []).map(item => new Share(fromJS(item)))
    let collections = Object.values(result.collections).map(item => new Collection(fromJS(item)))

    dispatch({ type: 'RECEIVE_COLLECTIONS', collections })
    dispatch({ type: 'RECEIVE_SHARES', shares })
    dispatch({ type: 'ALL_COLLECTIONS_RECEIVED' })
  }
}

export function generateNewCollection (id) {
  let collection = new Collection({
    id,
    name: '',
    editMode: true,
    created_at: new Date().toISOString()
  })

  return { type: 'RECEIVE_COLLECTION', collection }
}

export function createCollection (id, name) {
  return async function (dispatch) {
    let response = await request.post(api.collections(), { name })
    let collection = new Collection(fromJS(response.data))

    dispatch({ type: 'RECEIVE_COLLECTION', collection })
    dispatch({ type: 'REMOVE_COLLECTION', id })
  }
}

export function removeCollection (id) {
  return async function (dispatch) {
    await request.delete(api.collections(id))

    dispatch({ type: 'ROUTE_RESET_COLLECTION_ID', id })
    dispatch({ type: 'REMOVE_FAVORITE', id, resourceType: 'Collection' })
    dispatch({ type: 'REMOVE_COLLECTION', id })
  }
}

export function closeCollection (id) {
  return { type: 'CLOSE_COLLECTION', id }
}
