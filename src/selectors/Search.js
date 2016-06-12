import { createSelector } from 'reselect'
import { unNormaliseResources } from 'helpers'

let bundlesSelector = state => state.Bundle.get('byId')
let collectionsSelector = state => state.Collection.get('byId')
let usersSelector = state => state.User.get('byId')
let sharesSelector = state => state.Share.get('byId')
let searchSelector = state => state.Search

export const currentSearchResult = createSelector(
  [searchSelector, bundlesSelector, collectionsSelector, sharesSelector, usersSelector],
  (search, bundles, collections, shares, users) => {
    return search
      .update('bundles', data => unNormaliseResources(data, bundles, shares, users))
      .update('collections', data => unNormaliseResources(data, collections, shares, users))
  }
)