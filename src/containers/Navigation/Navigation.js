import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import * as routeActions from 'actions/Route'
import { NoBundle } from 'components'
import {
  Bundle,
  BundleNavigation,
  CollectionNavigation,
  CollectionBundlesNavigation,
  FavoriteNavigation,
  NotificationNavigation
} from 'containers'
import './Navigation.css'

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
    let oldRoute = fromJS(this.props.Route)
    let route = fromJS(nextProps.Route)

    return !route.equals(oldRoute)
  }

  parseRouteChange (props) {
    let { view } = props.route
    let { Route } = props
    let { bundleId, collectionId } = props.params

    if (bundleId && Route.bundleId !== bundleId) props.routeChangeBundleId(bundleId)
    if (this.shouldChangeNavigationView(props)) props.routeChangeNavigationView(view)

    if (collectionId && Route.collectionId !== collectionId) {
      props.routeChangeNavigationCollectionId(collectionId)
    }
  }

  getNavigationView () {
    let view = this.props.Route.navigationView || this.props.route.view

    switch (view) {
      case 'collections':
        return CollectionNavigation
      case 'collectionsBundles':
        return CollectionBundlesNavigation
      case 'favorites':
        return FavoriteNavigation
      case 'notifications':
        return NotificationNavigation
      default:
        return BundleNavigation
    }
  }

  getBundleView () {
    return this.props.Route.bundleId
      ? Bundle
      : NoBundle
  }

  shouldChangeNavigationView (props) {
    let { view } = props.route
    let { bundleId } = props.params
    let { navigationView } = props.Route
    let shouldChangeBundleView = !bundleId || view === 'collectionsBundles'

    return view && navigationView !== view && shouldChangeBundleView
  }

  render () {
    let NavigationComponent = this.getNavigationView()
    let BundleViewComponent = this.getBundleView()

    return <div className='navigation-wrapper'>
      <NavigationComponent />
      <BundleViewComponent />
    </div>
  }
}
