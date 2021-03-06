import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { parseId } from 'helpers'
import { RouteActions } from 'actions'
import { NoBundle } from 'components'
import { RouteSelectors } from 'selectors'
import { Bundle, BundleNavigation, CollectionNavigation, CollectionBundlesNavigation,
  FavoriteNavigation, NotificationNavigation, SearchNavigation } from 'containers'
import './Navigation.css'

let connectState = state => ({
  Route: RouteSelectors.all(state)
})

let connectProps = {
  ...RouteActions
}

let enhancer = connect(connectState, connectProps)

class Navigation extends React.Component {
  componentWillMount () {
    this.parseRouteChange(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.parseRouteChange(nextProps)
  }

  shouldComponentUpdate (nextProps) {
    let oldRoute = this.props.Route
    let route = nextProps.Route

    return !route.equals(oldRoute)
  }

  shouldChangeNavigationView (props) {
    let { view } = props.route
    let { bundleId } = props.params
    let { navigationView } = props.Route
    let shouldChangeBundleView = !bundleId || view === 'collectionsBundles'

    return view && (navigationView !== view) && shouldChangeBundleView
  }

  parseRouteChange (props) {
    let { view } = props.route
    let { Route } = props
    let { bundleId, collectionId, query } = props.params

    bundleId = parseId(bundleId)
    collectionId = parseId(collectionId)

    if (bundleId && Route.bundleId !== bundleId) props.routeChangeBundleId(bundleId)
    if (this.shouldChangeNavigationView(props)) props.routeChangeNavigationView(view)

    if (collectionId && Route.collectionId !== collectionId) {
      props.routeChangeNavigationCollectionId(collectionId)
    }

    if (view === 'search') props.routeChangeSearchQuery(query)
  }

  renderNavigation () {
    let view = this.props.Route.navigationView

    switch (view) {
      case 'bundles':
        return <BundleNavigation />
      case 'collections':
        return <CollectionNavigation />
      case 'collectionsBundles':
        return <CollectionBundlesNavigation />
      case 'favorites':
        return <FavoriteNavigation />
      case 'search':
        return <SearchNavigation />
      case 'notifications':
        return <NotificationNavigation />
      default:
        return false
    }
  }

  renderBundle () {
    return this.props.Route.bundleId
      ? <Bundle />
      : <NoBundle />
  }

  render () {
    return <div className='navigation flex-row flex-1'>
      {this.renderNavigation()}
      {this.renderBundle()}
    </div>
  }
}
export default enhancer(Navigation)
