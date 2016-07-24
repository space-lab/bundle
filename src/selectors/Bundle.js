import { createSelector } from 'reselect'
import { currentCollection } from './Collection'
import { parseId, unNormaliseResources } from 'helpers'

const bundlesSelector = state => state.Bundle
const usersSelector = state => state.User.byId
const sharesSelector = state => state.Share

const currentBundleIdSelector = state => state.Route.bundleId
const currentUserIdSelector = state => state.User.current

const getFilter = (state, props) => props.ui.filter
const getShareBundleId = (state, props) => parseId(props.params.id)

export const bundles = createSelector(bundlesSelector, bundles => bundles)

export const currentBundle = createSelector(
  [currentBundleIdSelector, bundlesSelector, sharesSelector, usersSelector],
  (id, bundles, shares, users) => {
    if (!bundles.get(id)) return null

    return bundles.get(id)
      .update('shares', ids => ids.map(id =>
        shares.get(id).update('user', id => users.get(id))))
  }
)

export const sortedBundles = createSelector(
  bundlesSelector,
  bundles => bundles
    .valueSeq()
    .sortBy(bundle => bundle.updated_at)
    .reverse()
    .toList()
)

export const filteredBundles = createSelector(
  [sortedBundles, getFilter, currentUserIdSelector],
  (bundles, filter, currentUser) => {
    bundles = bundles.filter(bundle => bundle.joined)

    switch (filter) {
      case 'recent':
        return bundles
      case 'mine':
        return bundles.filter(bundle => bundle.creator == currentUser)
      case 'shared':
        return bundles.filter(bundle => bundle.creator != currentUser)
      default:
        return bundles
    }
  }
)

export const currentBundles = createSelector(
  [filteredBundles, sharesSelector, usersSelector],
  (bundles, shares, users) =>
    bundles.map(bundle => bundle.update('shares', ids => ids.map(id =>
      shares.get(id).update('user', id => users.get(id)))))
)

export const sortedCollectionBundles = createSelector(
  [currentCollection, bundlesSelector, sharesSelector, usersSelector],
  (collection, bundles, shares, users) => {
    if (!collection || !collection.bundles) return []
    return unNormaliseResources(collection.bundles, bundles, shares, users)
  }
)

export const currentShareBundle = createSelector(
  [getShareBundleId, bundlesSelector, sharesSelector, usersSelector],
  (id, bundles, shares, users) => {
    if (!bundles.get(id)) return null

    return bundles.get(id)
      .update('shares', ids => ids.map(id =>
        shares.get(id).update('user', id => users.get(id))))
  }
)
