import { createSelector } from 'reselect'
import { unNormaliseResources } from 'helpers'
import { all as allBundles } from './Bundle'
import { all as allCollections } from './Collection'
import { all as allShares } from './Share'
import { all as allUsers } from './User'

export const result = state => state.Search
export const currentResult = createSelector(
  [result, allBundles, allCollections, allShares, allUsers],
  (search, bundles, collections, shares, users) =>
    search
      .update('bundles', data => unNormaliseResources(data, bundles, shares, users))
      .update('collections', data => unNormaliseResources(data, collections, shares, users)))
