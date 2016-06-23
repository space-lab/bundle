import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { List, ListItem, ResourceNavigation, ResourceFilters, ShareResource } from 'components'
import Selectors from 'selectors'
import * as bundleActions from 'actions/Bundle'
import * as searchActions from 'actions/Search'
import * as favoriteActions from 'actions/Favorite'
import * as shareActions from 'actions/Share'
import * as userAutocompleteActions from 'actions/UserAutocomplete'

const connectState = (state, props) => ({
  bundles: Selectors.currentBundles(state, props),
  bundleId: state.Route.bundleId,
  search: state.Search,
  userAutocomplete: state.UserAutocomplete
})

const connectProps = {
  ...bundleActions,
  ...searchActions,
  ...favoriteActions,
  ...shareActions,
  ...userAutocompleteActions
}

@ui({
  key: 'resource-navigation',
  state: { filter: 'recent', isOpen: false, position: null, resourceId: null }
})
@connect(connectState, connectProps)
export default class Container extends React.Component {
  static propTypes = {
    bundles: ImmutablePropTypes.list,
    search: ImmutablePropTypes.map
  }

  constructor (props) {
    super(props)
    props.getBundles()
  }

  removeBundle (...args) {
    this.props.removeBundle(...args)
    browserHistory.push('/bundles')
  }

  changeFilter (filter, e) {
    e.preventDefault()
  }

  renderShareResource () {
    let { bundles, ui } = this.props
    let resource = bundles.find(bundle => bundle.id == ui.resourceId)

    if (!resource || !resource.full_response) return false

    return <ShareResource
      {...this.props}
      position={this.props.ui.position}
      resource={resource}
      resourceName='Bundle'/>
  }

  renderBundleList (bundles, props) {
    return bundles.map((bundle, index) => {
      return <ListItem
        {...props}
        key={index}
        resource={bundle}
        resourceName={'Bundle'}
        Component={ListItem.Bundle}
        active={bundle.id === this.props.bundleId}
        remove={::this.removeBundle}
      />
    })
  }

  render () {
    let { bundles, search, ...props } = this.props
    let styles = { 'display': search.get('open') ? 'none' : 'block' }

    return (
      <ResourceNavigation>
        <div className='bundles-navigation'>
          {this.renderShareResource()}

          <ResourceNavigation.Header>
            <div className='title-and-actions'>
              <h2 style={styles} className='title'>Bundles</h2>

              <div className='nav'>
                <Link to='/search' className='icon search-icon' />
              </div>
            </div>
            <ResourceFilters />
          </ResourceNavigation.Header>

          <ResourceNavigation.Body>
            <List>
              {this.renderBundleList(bundles, props)}
            </List>
          </ResourceNavigation.Body>
        </div>
      </ResourceNavigation>
    )
  }
}
