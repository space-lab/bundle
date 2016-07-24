import { createSelector } from 'reselect'
import { Collection } from 'records'

let collectionsSelector = state => state.Collection
let usersSelector = state => state.User.byId
let sharesSelector = state => state.Share.get('byId')

let currentCollectionIdSelector = state => state.Route.collectionId
let currentUserIdSelector = state => state.User.current
let getFilter = (state, props) => props.ui.filter

export const collections = createSelector(collectionsSelector, collections =>
  collections)

export const currentCollection = createSelector(
  [currentCollectionIdSelector, collectionsSelector],
  (id, collections) => collections.get(id) || new Collection())

export const collectionList = createSelector(
  [collectionsSelector],
  (collections) => collections.valueSeq().toList())

export const sortedCollections = createSelector(
  collectionsSelector,
  collections => collections
    .valueSeq()
    .sortBy(col => col.created_at)
    .reverse()
    .toList()
)

export const filteredCollections = createSelector(
  [sortedCollections, getFilter, currentUserIdSelector],
  (collections, filter, currentUser) => {
    switch (filter) {
      case 'recent':
        return collections
      case 'mine':
        return collections.filter(collection => collection.creator === currentUser)
      case 'shared':
        return collections.filter(collection => collection.creator !== currentUser)
      default:
        return collections
    }
  }
)

export const currentCollections = createSelector(
  [filteredCollections, sharesSelector, usersSelector],
  (collections, shares, users) =>
    collections.map(col => col.update('shares', ids => ids.map(id =>
      shares.get(id).update('user', id => users.get(id))))))
