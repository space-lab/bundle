import { createSelector } from 'reselect'

let linksSelector = state => state.Link.byId
let currentLinksSelector = state => state.Link.current
let currentBundleIdSelector = state => state.Route.bundleId

export const links = createSelector(linksSelector, links => links)

export const currentLink = createSelector(
  [currentBundleIdSelector, currentLinksSelector],
  (bundleId, currentLinks) => currentLinks.get(bundleId)
)

