import { combineReducers } from 'redux'
import { Map } from 'immutable'

export default combineReducers({
  byId: collectionReducer,
  receivedAll: receivedAllCollectionReducer
})

function receivedAllCollectionReducer (state = false, action) {
  switch (action.type) {
    case 'RECEIVE_ALL_COLLECTIONS':
      return state = true

    default:
      return state
  }
}

function collectionReducer (state = Map(), action) {
  switch (action.type) {
    case 'RECEIVE_COLLECTIONS':
      return state.merge(action.collections.toMap().mapKeys((k, v) => v.id))

    case 'RECEIVE_COLLECTION':
      return state.set(action.collection.id, action.collection)

    case 'FAVORITE_COLLECTION':
      return state.update(action.id, col =>
        col.set('favorited', true))

    case 'UNFAVORITE_COLLECTION':
      return state.update(action.id, col =>
        col.set('favorited', false))

    case 'CLOSE_COLLECTION':
    case 'REMOVE_COLLECTION':
      return state.delete(action.id)

    case 'ADD_SHARES_TO_COLLECTION':
      return state
        .updateIn([action.resourceId, 'shares'], shares =>
          shares.concat(action.shares))

    case 'REMOVE_SHARE':
      if (!state.get(action.resourceId)) return state

      return state.updateIn([action.resourceId, 'shares'], shares =>
        shares.delete(shares.indexOf(action.id)))

    case 'RECEIVE_COLLECTION_SHARE_URL':
      return state.update(action.resourceId, collection =>
        collection
          .set('share_url', action.share_url)
          .set('share_url_permission', action.share_url_permission))

    case 'CHANGE_COLLECTION_SHARE_URL_PERMISSION':
      return state.update(action.resourceId, collection =>
        collection.set('share_url_permission', action.permission))

    case 'REMOVE_COLLECTION_SHARE_URL':
      return state.update(action.resourceId, collection =>
        collection
          .delete('share_url')
          .delete('share_url_permission'))

    case 'REMOVE_BUNDLE':
      return state.map(collection =>
        collection.update('bundles', bundles =>
          bundles.filterNot(bundle =>
            bundle.id === action.id)))

    default:
      return state
  }
}
