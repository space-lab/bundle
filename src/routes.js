import { Route, Router, IndexRedirect } from 'react-router'
import { history } from 'store/store'

import {
  App,
  Navigation,
  SearchContainer,
  BundleNew,
  Share,
  Logout,
  Settings
} from './containers'

export default (
  <Router history={history}>
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
      <Route path='/logout' component={Logout}/>
    </Route>

    <Route path='/share/:resource/:id/:token' component={Share}/>
  </Router>
)
