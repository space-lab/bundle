import { createSelector } from 'reselect'
import { all as allUsers } from './User'
import { all as allShares } from './Share'
import { current as currentCollection } from './Collection'
import { parseId, unNormaliseResources } from 'helpers'

export const all = state => state.Bundle

const currentBundleIdSelector = state => state.Route.bundleId
const currentUserIdSelector = state => state.User.current

const getFilter = (state, props) => props.ui.filter
const getShareBundleId = (state, props) => parseId(props.params.id)


export const currentBundle = createSelector(
  [currentBundleIdSelector, all, allShares, allUsers],
  (id, bundles, shares, users) => {
    if (!bundles.get(id)) return null

    return bundles.get(id)
      .update('shares', ids => ids.map(id =>
        shares.get(id).update('user', id => users.get(id))))
  }
)

export const sortedBundles = createSelector(all, bundles =>
  bundles
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
  [filteredBundles, allShares, allUsers],
  (bundles, shares, users) =>
    bundles.map(bundle => bundle.update('shares', ids => ids.map(id =>
      shares.get(id).update('user', id => users.get(id)))))
)

export const sortedCollectionBundles = createSelector(
  [currentCollection, all, allShares, allUsers],
  (collection, bundles, shares, users) => {
    if (!collection || !collection.bundles) return []
    return unNormaliseResources(collection.bundles, bundles, shares, users)
  }
)

export const currentShareBundle = createSelector(
  [getShareBundleId, all, allShares, allUsers],
  (id, bundles, shares, users) => {
    if (!bundles.get(id)) return null

    return bundles.get(id)
      .update('shares', ids => ids.map(id =>
        shares.get(id).update('user', id => users.get(id))))
  }
)
