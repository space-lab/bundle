import { createSelector } from 'reselect'

let currentBundleIdSelector = state => state.Route.bundleId
let currentLinksSelector = state => state.Link.get('current')

export const currentLink = createSelector(
  [currentBundleIdSelector, currentLinksSelector],
  (bundleId, currentLinks) => currentLinks.get(bundleId)
)
