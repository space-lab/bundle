import { Bundle } from 'records'
import { Map } from 'immutable'

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SAVE_BUNDLE':
      return state
        .set(action.bundle.id, action.bundle)

    case 'ADD_SHARES_TO_BUNDLE':
      return state
        .updateIn([action.resourceId, 'shares'], shares =>
          shares.concat(action.shares))

    case 'RECEIVE_BUNDLES':
      return state.merge(action.bundles.toMap().mapKeys((k, v) => v.id))

    case 'REMOVE_BUNDLE':
      return state.delete(action.id)

    case 'FAVORITE_BUNDLE':
      return state.update(action.id, bundle =>
        bundle.set('favorited', true))

    case 'UNFAVORITE_BUNDLE':
      return state.update(action.id, bundle =>
        bundle.set('favorited', false))

    case 'UPDATE_BUNDLE_INFO':
      return state.setIn([action.bundleId, action.field], action.value)

    case 'RECEIVE_LINK':
      return state.updateIn([action.bundleId, 'links'], links =>
        links.unshift(action.link.id))

    case 'REMOVE_LINK':
      return state.updateIn([action.bundleId, 'links'], links =>
        links.delete(links.indexOf(action.id)))

    case 'REMOVE_SHARE':
      if (!state.get(action.resourceId)) return state

      return state.updateIn([action.resourceId, 'shares'], shares =>
        shares.delete(shares.indexOf(action.id)))

    case 'REMOVE_COLLECTION':
      return state.filter(bundle => bundle.collection_id !== action.id)

    case 'RECEIVE_BUNDLE_SHARE_URL':
      return state.update(action.resourceId, bundle =>
        bundle
          .set('share_url', action.share_url)
          .set('share_url_permission', action.share_url_permission))

    case 'CHANGE_BUNDLE_SHARE_URL_PERMISSION':
      return state.update(action.resourceId, bundle =>
        bundle.set('share_url_permission', action.permission))

    case 'REMOVE_BUNDLE_SHARE_URL':
      return state.update(action.resourceId, bundle =>
        bundle
          .delete('share_url')
          .delete('share_url_permission'))

    default:
      return state
  }
}
