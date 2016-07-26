import { createSelector } from 'reselect'
import { all as allUsers } from './User'
import { all as allShares } from './Share'
import { all as allBundles } from './Bundle'
import { all as allCollections } from './Collection'

export const all = state => state.Favorite
export const sorted = createSelector(
  [all, allShares, allUsers, allBundles, allCollections],
  (favorites, shares, users, bundles, collections) => favorites
    .valueSeq()
    .sortBy(item => item.get('created_at'))
    .reverse()
    .toList()
    .map(item => {
      let id = item.get('id')
      let type = item.get('type')

      return type === 'Bundle'
        ? bundles.get(id).set('type', type)
        : collections.get(id).set('type', type)
    })
    .map(res => res.update('shares', ids => ids.map(id =>
      shares.get(id).update('user', id => users.get(id))))))
