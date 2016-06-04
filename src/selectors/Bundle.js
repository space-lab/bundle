import { createSelector } from 'reselect'
import { NEW_BUNDLE_ID } from 'constants'
import { currentCollection } from './Collection'

let bundlesSelector = state => state.Bundle.get('byId')
let usersSelector = state => state.User.get('byId')
let sharesSelector = state => state.Share.get('byId')

let currentBundleIdSelector = state => state.Route.bundleId
let currentUserIdSelector = state => state.User.get('current')

let getFilter = (state, props) => props.ui.filter

export const currentBundle = createSelector(
  [currentBundleIdSelector, bundlesSelector, sharesSelector, usersSelector],
  (id, bundles, shares, users) => {
    if (!bundles.get(id)) return null

    return bundles.get(id)
      .update('shares', ids => ids.map(id => {
        return shares.get(id).update('user', id => users.get(id))
      }))
  }
)

export const sortedBundles = createSelector(
  bundlesSelector,
  bundles => bundles
    .valueSeq()
    .filter(bundle => bundle.id != NEW_BUNDLE_ID)
    .sortBy(bundle => bundle.created_at)
    .reverse()
    .toList()
)

export const filteredBundles = createSelector(
  [sortedBundles, getFilter, currentUserIdSelector],
  (bundles, filter, currentUser) => {
    switch (filter) {
      case 'recent':
        return bundles.slice(0, 15)
      case 'mine':
        return bundles.filter(bundle => bundle.creator == currentUser)
      case 'shared':
        return bundles.filter(bundle => bundle.creator != currentUser)
      default:
        return bundles
    }
  }
)

export const currentBundleShares = createSelector(
  [currentBundle, sharesSelector],
  (bundle, shares) => bundle.shares.map(id => shares.get(id))
)

export const currentBundles = createSelector(
  [filteredBundles, sharesSelector, usersSelector],
  (bundles, shares, users) => {
    return bundles.map(bundle => bundle.update('shares', ids => ids.map(id => {
      return shares.get(id).update('user', id => users.get(id))
    })))
  }
)

export const sortedCollectionBundles = createSelector(
  [currentCollection, bundlesSelector],
  (collection, bundles) => {
    if (!collection) return []

    return collection.bundles
      .map(id => bundles.get(id))
      .sortBy(col => col.created_at)
      .reverse()
      .toList()
  }
)
