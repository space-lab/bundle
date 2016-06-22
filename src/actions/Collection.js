import request from 'axios'
import api from 'api'

import { Collection } from 'records'
import { reduceCollection, reduceCollections } from 'helpers'

export const getCollection = id => async dispatch => {
  const { data } = await request.get(api.collections(id))
  reduceCollection(data, dispatch)
}

export const getCollections = () => async dispatch => {
  const { data } = await request.get(api.collections())
  reduceCollections(data, dispatch)
}

export const generateNewCollection = id => {
  const collection = new Collection({
    id,
    name: '',
    editMode: true,
    created_at: new Date().toISOString()
  })

  return { type: 'RECEIVE_COLLECTION', collection }
}

export const createCollection = (id, name) => async dispatch => {
  const { data } = await request.post(api.collections(), { name })

  reduceCollection(data, dispatch)
  dispatch({ type: 'CLOSE_COLLECTION', id })
}

export const removeCollection = id => async dispatch => {
  await request.delete(api.collections(id))

  dispatch({ type: 'ROUTE_RESET_COLLECTION_ID', id })
  dispatch({ type: 'REMOVE_FAVORITE', id, resourceType: 'Collection' })
  dispatch({ type: 'REMOVE_COLLECTION', id })
}

export const closeCollection = id => ({ type: 'CLOSE_COLLECTION', id })
