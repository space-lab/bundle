import { createSelector } from 'reselect'

export const all = state => state.User.byId
export const currentId = state => state.User.current
export const autocompletes = state => state.User.autocomplete
export const current = createSelector(
  [all, currentId],
  (users, id) => users.get(id)
)
