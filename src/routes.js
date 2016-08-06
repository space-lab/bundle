import { Route, Router, IndexRedirect } from 'react-router'
import { App, Navigation, PublicShare, Settings, Logout } from './containers'
import { history } from 'store/store'

export default (
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRedirect to='/bundles' />

      <Route path='/bundles' view='bundles' component={Navigation}>
        <Route path='/bundle/:bundleId' view='bundles' component={Navigation} />
      </Route>

      <Route path='/collection/:collectionId' view='collectionsBundles' component={Navigation}>
        <Route path='/collection/:collectionId/bundle/:bundleId' view='collectionsBundles' component={Navigation} />
      </Route>

      <Route path='/collections' view='collections' component={Navigation} />
      <Route path='/favorites' view='favorites' component={Navigation} />

      <Route path='/search(/:query)' view='search' component={Navigation} />

      <Route path='/settings' component={Settings} />
      <Route path='/logout' component={Logout} />
    </Route>

    <Route path='/share/:resource/:id/:token' component={PublicShare} />
  </Router>
)
