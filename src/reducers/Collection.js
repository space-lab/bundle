import { fromJS, Map, List } from 'immutable'

let defaultState = Map({
  byId: Map()
})

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_COLLECTIONS':
      action.collections.forEach(col => {
        if (state.getIn(['byId', col.id, 'full_response'])) return
        state = state.setIn(['byId', col.id], col)
      })

      return state

    case 'RECEIVE_COLLECTION':
      return state.setIn(['byId', action.collection.id], action.collection)

    case 'FAVORITE_COLLECTION':
      return state.updateIn(['byId', action.id], (col) => col.set('favorited', true))

    case 'UNFAVORITE_COLLECTION':
      return state.updateIn(['byId', action.id], (col) => col.set('favorited', false))

    case 'CLOSE_COLLECTION':
    case 'REMOVE_COLLECTION':
      return state.deleteIn(['byId', action.id])

    case 'ALL_COLLECTIONS_RECEIVED':
      return state.set('receivedAll', true)

    case 'ADD_SHARES_TO_COLLECTION':
      return state
        .updateIn(['byId', action.resourceId, 'shares'], shares =>
          shares.concat(action.shares))

    case 'REMOVE_SHARE':
      if (!state.getIn(['byId', action.resourceId])) return state

      return state.updateIn(['byId', action.resourceId, 'shares'], shares =>
        shares.delete(shares.indexOf(action.id)))

    case 'RECEIVE_COLLECTION_SHARE_URL':
      return state.updateIn(['byId', action.resourceId],
        collection => collection.set('share_url', action.url))

    case 'CHANGE_COLLECTION_SHARE_URL_PERMISSION':
      return state.updateIn(['byId', action.resourceId],
        collection => collection.set('share_url_permission', action.permission))

    case 'REMOVE_COLLECTION_SHARE_URL':
      return state.updateIn(['byId', action.resourceId],
        collection => collection
          .delete('share_url')
          .delete('share_url_permission'))

    default:
      return state
  }
}
