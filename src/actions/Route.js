export const routeChangeBundleId = bundleId => ({
  type: 'ROUTE_CHANGE_BUNDLE_ID', bundleId
})

export const routeChangeNavigationView = view => ({
  type: 'ROUTE_CHANGE_NAVIGATION_VIEW', view
})

export const routeChangeNavigationCollectionId = collectionId => ({
  type: 'ROUTE_CHANGE_NAVIGATION_COLLECTION_ID', collectionId
})

export const routeChangeSearchQuery = query => ({
  type: 'ROUTE_CHANGE_SEARCH_QUERY', query
})
