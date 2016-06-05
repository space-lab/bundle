import request from 'axios'
import api from 'api'

import { fromJS } from 'immutable'
import { Collection } from 'records'
import { reduceCollection } from 'helpers'

export const getCollection = id => async dispatch => {
  let { data } = await request.get(api.collections(id))
  reduceCollection(data, dispatch)
}

export const getCollections = () => async dispatch => {
  let { data } = await request.get(api.collections())
  reduceCollection(data, dispatch, true)
}

export const generateNewCollection = id => {
  let collection = new Collection({
    id,
    name: '',
    editMode: true,
    created_at: new Date().toISOString()
  })

  return { type: 'RECEIVE_COLLECTION', collection }
}

export const createCollection = (id, name) => async dispatch => {
  let { data } = await request.post(api.collections(), { name })

  reduceCollection(data, dispatch)
  dispatch({ type: 'REMOVE_COLLECTION', id })
}

export const removeCollection = id => async dispatch => {
  await request.delete(api.collections(id))

  dispatch({ type: 'ROUTE_RESET_COLLECTION_ID', id })
  dispatch({ type: 'REMOVE_FAVORITE', id, resourceType: 'Collection' })
  dispatch({ type: 'REMOVE_COLLECTION', id })
}

export const closeCollection = id => ({ type: 'CLOSE_COLLECTION', id })
