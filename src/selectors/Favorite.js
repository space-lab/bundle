import { createSelector } from 'reselect'

let favoritesSelector = state => state.Favorite.get('byId')

export const sortedFavorites = createSelector(
  favoritesSelector,
  favorites => favorites
    .valueSeq()
    .sortBy(item => item.get('created_at'))
    .reverse()
    .toList()
)
