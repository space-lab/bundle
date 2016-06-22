import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { NEW_BUNDLE_ID } from 'constants'
import * as routeActions from 'actions/Route'
import './index.css'

import {
  Bundle,
  BundleNavigation,
  CollectionNavigation,
  CollectionBundlesNavigation,
  FavoriteNavigation,
  NotificationNavigation
} from 'containers'

import { BundleView as BundleViewComponent } from 'components'

const connectState = (state) => ({
  Route: state.Route.toJS()
})

const connectProps = routeActions

@connect(connectState, connectProps)
export default class Navigation extends React.Component {
  componentWillMount () {
    this.parseRouteChange(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.parseRouteChange(nextProps)
  }

  shouldComponentUpdate (nextProps) {
    const oldRoute = fromJS(this.props.Route)
    const route = fromJS(nextProps.Route)

    return !route.equals(oldRoute)
  }

  render () {
    const NavigationComponent = this.getNavigationView()
    const BundleViewComponent = this.getBundleView()

    return (
      <div className='navigation-wrapper'>
        <NavigationComponent />
        <BundleViewComponent />
      </div>
    )
  }

  parseRouteChange (props) {
    const { view, newBundle } = props.route
    const { bundleId, collectionId } = props.params
    const Route = props.Route

    if (newBundle && this.isNewBundle(props) !== newBundle) props.routeChangeNewBundle()
    if (bundleId && Route.bundleId !== bundleId) props.routeChangeBundleId(bundleId)
    if (this.shouldChangeNavigationView(props)) props.routeChangeNavigationView(view)

    if (collectionId && Route.collectionId !== collectionId) {
      props.routeChangeNavigationCollectionId(collectionId)
    }
  }

  getNavigationView () {
    const view = this.props.Route.navigationView || this.props.route.view

    if (view === 'collections') return CollectionNavigation
    if (view === 'collectionsBundles') return CollectionBundlesNavigation
    if (view === 'favorites') return FavoriteNavigation
    if (view === 'notifications') return NotificationNavigation

    return BundleNavigation
  }

  getBundleView () {
    if (!this.props.Route.bundleId) {
      return BundleViewComponent.noBundleSelected
    }

    return this.isNewBundle(this.props) ? Bundle.New : Bundle.View
  }

  shouldChangeNavigationView (props) {
    const { view, newBundle } = props.route
    const { bundleId } = props.params
    const navigationView = props.Route.navigationView
    const shouldChangeBundleView = !newBundle && (!bundleId || bundleId && view === 'collectionsBundles')

    return view && navigationView !== view && shouldChangeBundleView
  }

  isNewBundle (props) {
    return props.Route.bundleId === NEW_BUNDLE_ID
  }
}
