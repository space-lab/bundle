import { createSelector } from 'reselect'

let usersSelector = state => state.User.byId
let currentUserIdSelector = state => state.User.current

export const users = createSelector(usersSelector, users => users)

export const currentUser = createSelector(
  [currentUserIdSelector, usersSelector],
  (id, users) => users.get(id)
)

