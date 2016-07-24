import { createSelector } from 'reselect'

let usersSelector = state => state.User.byId
let currentUserIdSelector = state => state.User.current
let autocompletes = state => state.User.autocomplete

export const users = createSelector(usersSelector, users => users)

export const autocompleteUsers = createSelector(autocompletes, users => users)

export const currentUser = createSelector(
  [currentUserIdSelector, usersSelector],
  (id, users) => users.get(id)
)

