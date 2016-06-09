import { Bundle } from 'records'
import { NEW_BUNDLE_ID } from 'constants'
import { fromJS, Map, List } from 'immutable'

let defaultState = Map({
  byId: Map(),
  current: undefined
})

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SAVE_BUNDLE':
      return state
        .setIn(['byId', action.bundle.id], action.bundle)

    case 'ADD_SHARES_TO_BUNDLE':
      return state
        .updateIn(['byId', action.resourceId, 'shares'], shares =>
          shares.concat(action.shares))

    case 'ADD_LINK_ID_TO_BUNDLE':
      return state
        .updateIn(['byId', action.bundleId, 'links'], links =>
          links.unshift(action.linkId))

    case 'REMOVE_LINK_ID_FROM_BUNDLE':
      return state
        .updateIn(['byId', action.bundleId, 'links'], links =>
          links.delete(action.index))

    case 'RECEIVE_BUNDLES':
      action.bundles.forEach(bundle => {
        if (state.getIn(['byId', bundle.id, 'full_response'])) return
        state = state.setIn(['byId', bundle.id], bundle)
      })

      return state

    case 'REMOVE_BUNDLE':
      return state.deleteIn(['byId', action.id])

    case 'FAVORITE_BUNDLE':
      return state.updateIn(['byId', action.id], bundle =>
        bundle.set('favorited', true))

    case 'UNFAVORITE_BUNDLE':
      return state.updateIn(['byId', action.id], bundle =>
        bundle.set('favorited', false))

    case 'UPDATE_BUNDLE_INFO':
      return state.setIn(['byId', action.bundleId, action.field], action.value)

    case 'REMOVE_SHARE':
      if (!state.getIn(['byId', action.resourceId])) return state

      return state.updateIn(['byId', action.resourceId, 'shares'], shares =>
        shares.delete(shares.indexOf(action.id)))

    case 'REMOVE_COLLECTION':
      return state.update('byId', bundles =>
        bundles.filter(bundle => bundle.collection_id !== action.id))

    default:
      return state
  }
}
