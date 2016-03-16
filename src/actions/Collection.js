import request from 'axios'
import api from './../api'

export function getCollection (id) {
  return async (dispatch) => {
    const response = await request.get(api.collections(id))
    dispatch({ type: 'RECEIVE_COLLECTION', collection: response.data })
  }
}

export function getCollections () {
  return async (dispatch) => {
    const response = await request.get(api.collections())
    dispatch({ type: 'RECEIVE_COLLECTIONS', list: response.data })
  }
}

export function removeCollection (id) {
  return async (dispatch) => {
    const response = await request.delete(api.collections(id))
    dispatch({ type: 'REMOVE_COLLECTION', id })
  }
}
