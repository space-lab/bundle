import { createSelector } from 'reselect'
import { all as allUsers, currentId as currentUserId } from './User'
import { all as allShares } from './Share'
import { bundleId } from './Route'
import { current as currentCollection } from './Collection'
import { parseId, unNormaliseResources } from 'helpers'

let resourceFilter = (_, props) => props.resourceFilter
let getShareBundleId = (state, props) => parseId(props.params.id)

export const all = state => state.Bundle
export const currentId = bundleId
export const current = createSelector(
  [currentId, all, allShares, allUsers],
  (id, bundles, shares, users) => {
    if (!bundles.get(id)) return null

    return bundles.get(id)
      .update('shares', ids => ids.map(id =>
        shares.get(id).update('user', id => users.get(id))))
  }
)

export const sorted = createSelector(all, bundles =>
  bundles
    .valueSeq()
    .sortBy(bundle => bundle.updated_at)
    .sortBy(bundle => bundle.unlisted)
    .reverse()
    .toList())

export const filtered = createSelector(
  [sorted, resourceFilter, currentUserId],
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

export const currents = createSelector(
  [filtered, allShares, allUsers],
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
