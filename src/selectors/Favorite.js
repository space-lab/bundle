import { createSelector } from 'reselect'

let favoritesSelector = state => state.Favorite.get('byId')
let usersSelector = state => state.User.get('byId')
let sharesSelector = state => state.Share.get('byId')
let bundlesSelector = state => state.Bundle.get('byId')
let collectionsSelector = state => state.Collection.get('byId')

export const sortedFavorites = createSelector(
  [favoritesSelector, sharesSelector, usersSelector, bundlesSelector, collectionsSelector],
  (favorites, shares, users, bundles, collections) => favorites
    .valueSeq()
    .sortBy(item => item.get('created_at'))
    .reverse()
    .toList()
    .map(item => {
      let id = item.get('id')
      let type = item.get('type')

      if (type == 'Bundle') {
        return bundles.get(id).set('type', type)
      } else {
        return collections.get(id).set('type', type)
      }
    })
    .map(res => res.update('shares', ids => ids.map(id => {
      return shares.get(id).update('user', id => users.get(id))
    })))
)
