import { createSelector } from 'reselect'

let linksSelector = state => state.Link.get('byId')
let currentBundleIdSelector = state => state.Route.bundleId
let currentLinksSelector = state => state.Link.get('current')

export const currentLink = createSelector(
  [currentBundleIdSelector, currentLinksSelector],
  (bundleId, currentLinks) => currentLinks.get(bundleId)
)

export const links = createSelector(linksSelector, links => links)
