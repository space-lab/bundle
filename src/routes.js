import { Route, IndexRedirect } from 'react-router'

import {
  App,
  Navigation,
  SearchContainer,
  BundleNew
} from './containers'

export default (
  <Route path='/' component={App}>
    <IndexRedirect to='/bundles' />

    <Route path='/search(/:query)' component={SearchContainer} />

    <Route path='/bundles' view='bundles' component={Navigation}>
      <Route path='/bundles/:bundleId' view='bundles' component={Navigation} />
    </Route>

    <Route path='/new' newBundle={true} view='bundles' component={Navigation} />

    <Route path='/collections/:collectionId' view='collectionsBundles' component={Navigation}>
      <Route path='/collections/:collectionId/bundles/:bundleId' view='collectionsBundles' component={Navigation} />
    </Route>
    <Route path='/collections' view='collections' component={Navigation} />
    <Route path='/favorites' view='favorites' component={Navigation}/>
    <Route path='/notifications' view='notifications' component={Navigation} />
  </Route>
)
