import { createSelector } from 'reselect'
import { unNormaliseResources } from 'helpers'

let bundlesSelector = state => state.Bundle
let collectionsSelector = state => state.Collection.byId
let usersSelector = state => state.User.byId
let sharesSelector = state => state.Share
let searchSelector = state => state.Search

export const currentSearchResult = createSelector(
  [searchSelector, bundlesSelector, collectionsSelector, sharesSelector, usersSelector],
  (search, bundles, collections, shares, users) => {
    return search
      .update('bundles', data => unNormaliseResources(data, bundles, shares, users))
      .update('collections', data => unNormaliseResources(data, collections, shares, users))
  }
)
