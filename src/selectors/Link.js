import { createSelector } from 'reselect'
import { currentId as currentBundleId } from './Bundle'

export const all = state => state.Link.byId
export const bundleCurrents = state => state.Link.current
export const current = createSelector(
  [bundleCurrents, currentBundleId],
  (current, bundleId) => current.get(bundleId)
)
