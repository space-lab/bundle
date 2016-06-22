import { NEW_BUNDLE_ID } from 'constants'

export const routeChangeBundleId = bundleId => ({
  type: 'ROUTE_CHANGE_BUNDLE_ID', bundleId
})

export const routeChangeNewBundle = () => ({
  type: 'ROUTE_CHANGE_BUNDLE_ID', bundleId: NEW_BUNDLE_ID
})

export const routeChangeNavigationView = view => ({
  type: 'ROUTE_CHANGE_NAVIGATION_VIEW', view
})

export const routeChangeNavigationCollectionId = collectionId => ({
  type: 'ROUTE_CHANGE_NAVIGATION_COLLECTION_ID', collectionId
})
