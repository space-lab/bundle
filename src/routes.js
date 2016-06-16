import { Route, IndexRedirect } from 'react-router'

import {
  App,
  Navigation,
  SearchContainer,
  BundleNew,
  Logout,
  Settings
} from './containers'

export default (
  <Route path='/' component={App}>
    <IndexRedirect to='/bundles'/>

    <Route path='/bundles' view='bundles' component={Navigation}>
      <Route path='/bundle/:bundleId' view='bundles' component={Navigation}/>
    </Route>

    <Route path='/collection/:collectionId' view='collectionsBundles' component={Navigation}>
      <Route path='/collection/:collectionId/bundle/:bundleId' view='collectionsBundles' component={Navigation}/>
    </Route>

    <Route path='/collections' view='collections' component={Navigation}/>
    <Route path='/favorites' view='favorites' component={Navigation}/>

    <Route path='/new' newBundle={true} view='bundles' component={Navigation}/>

    <Route path='/search(/:query)' component={SearchContainer}/>

    <Route path='/settings' component={Settings}/>
    <Route path='/logout' component={Settings}/>
  </Route>
)
