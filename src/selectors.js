import { createSelector } from 'reselect'
import { NEW_BUNDLE_ID } from 'constants'

let bundlesSelector = state => state.Bundle.get('byId')
let collectionsSelector = state => state.Collection.get('byId')
let favoritesSelector = state => state.Favorite.get('byId')
let usersSelector = state => state.User.get('byId')
let sharesSelector = state => state.Share.get('byId')

let currentBundleIdSelector = state => state.Route.bundleId
let currentCollectionIdSelector = state => state.Route.collectionId
let currentUserIdSelector = state => state.User.get('current')
let currentLinksSelector = state => state.Link.get('current')

let getFilter = (state, props) => {
  return props ? props.ui.filter : null
}

export const currentBundleSelector = createSelector(
  [currentBundleIdSelector, bundlesSelector, sharesSelector, usersSelector],
  (id, bundles, shares, users) => {
    if (!bundles.get(id)) return null

    return bundles.get(id)
      .update('shares', ids => ids.map(id => {
        return shares.get(id).update('user', id => users.get(id))
      }))
  }
)

export const currentCollectionSelector = createSelector(
  [currentCollectionIdSelector, collectionsSelector],
  (id, collections) => collections.get(id)
)

export const currentUserSelector = createSelector(
  [currentUserIdSelector, usersSelector],
  (id, users) => users.get(id)
)

export const currentLinkSelector = createSelector(
  [currentBundleIdSelector, currentLinksSelector],
  (bundleId, currentLinks) => currentLinks.get(bundleId)
)

export const collectionListSelector = createSelector(
  [collectionsSelector],
  (collections) => collections.valueSeq().toList()
)

export const sortedBundlesSelector = createSelector(
  bundlesSelector,
  bundles => bundles
    .valueSeq()
    .filter(bundle => bundle.id != NEW_BUNDLE_ID)
    .sortBy(bundle => bundle.created_at)
    .reverse()
    .toList()
)

export const sortedCollectionsSelector = createSelector(
  collectionsSelector,
  collections => collections
    .valueSeq()
    .sortBy(col => col.created_at)
    .reverse()
    .toList()
)

export const filteredBundlesSelector = createSelector(
  [sortedBundlesSelector, getFilter, currentUserIdSelector],
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

export const filteredCollectionsSelector = createSelector(
  [sortedCollectionsSelector, getFilter, currentUserIdSelector],
  (collections, filter, currentUser) => {
    switch (filter) {
      case 'recent':
        return collections.slice(0, 15)
      case 'mine':
        return collections.filter(collection => collection.creator == currentUser)
      case 'shared':
        return collections.filter(collection => collection.creator != currentUser)
      default:
        return collections
    }
  }
)


export const sortedCollectionBundlesSelector = createSelector(
  [currentCollectionSelector, bundlesSelector],
  (collection, bundles) => {
    if (!collection) return []

    return collection.bundles
      .map(id => bundles.get(id))
      .sortBy(col => col.created_at)
      .reverse()
      .toList()
  }
)

export const sortedFavoritesSelector = createSelector(
  favoritesSelector,
  favorites => favorites
    .valueSeq()
    .sortBy(item => item.get('created_at'))
    .reverse()
    .toList()
)

export const currentBundleSharesSelector = createSelector(
  [currentBundleSelector, sharesSelector],
  (bundle, shares) => bundle.shares.map(id => shares.get(id))
)

export const currentBundlesSelector = createSelector(
  [filteredBundlesSelector, sharesSelector, usersSelector],
  (bundles, shares, users) => {
    return bundles.map(bundle => bundle.update('shares', ids => ids.map(id => {
      return shares.get(id).update('user', id => users.get(id))
    })))
  }
)

export const currentCollectionsSelector = createSelector(
  [filteredCollectionsSelector, sharesSelector, usersSelector],
  (collections, shares, users) => {
    return collections.map(col => col.update('shares', ids => ids.map(id => {
      return shares.get(id).update('user', id => users.get(id))
    })))
  }
)
