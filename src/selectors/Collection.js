import { createSelector } from 'reselect'
import { all as allUsers, currentId as currentUserId } from './User'
import { all as allShares } from './Share'
import { Collection } from 'records'

let getFilter = (state, props) => props.ui.filter

export const all = state => state.Collection.byId
export const currentId = state => state.Route.collectionId
export const receivedAll = state => state.Collection.receivedAll

export const current = createSelector(
  [currentId, all, allShares, allUsers],
  (id, collections, shares, users) => {
    let collection = collections.get(id) || new Collection()

    return collection.update('shares', ids => ids.map(id =>
      shares.get(id).update('user', id => users.get(id))))
  }
)

export const sorted = createSelector(
  all,
  collections => collections
    .valueSeq()
    .sortBy(col => col.created_at)
    .reverse()
    .toList())

export const filtered = createSelector(
  [sorted, getFilter, currentUserId],
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

export const currents = createSelector(
  [filtered, allShares, allUsers],
  (collections, shares, users) =>
    collections.map(col => col.update('shares', ids => ids.map(id =>
      shares.get(id).update('user', id => users.get(id))))))
