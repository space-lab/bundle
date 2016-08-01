import { createSelector } from 'reselect'

export const all = state => state.Route
export const searchQuery = createSelector(all, route => route.searchQuery)
export const bundleId = createSelector(all, route => route.bundleId)
export const collectionId = createSelector(all, route => route.collectionId)
