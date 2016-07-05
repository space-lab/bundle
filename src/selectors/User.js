import { createSelector } from 'reselect'

let usersSelector = state => state.User.get('byId')
let currentUserIdSelector = state => state.User.get('current')

export const currentUser = createSelector(
  [currentUserIdSelector, usersSelector],
  (id, users) => users.get(id)
)

export const users = createSelector(usersSelector, users => users)
