import { createSelector } from 'reselect'
import { currentId as currentBundleId } from './Bundle'

export const all = state => state.Link.byId
export const currentId = state => state.Link.current
export const current = createSelector(
  [all, currentBundleId],
  (links, bundleId) => links.get(bundleId))
