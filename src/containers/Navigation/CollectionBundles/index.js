import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import { ResourceNavigation, List, ListItem, ShareResource } from 'components'
import Selectors from 'selectors'

import * as collectionActions from 'actions/Collection'
import * as bundleActions from 'actions/Bundle'
import * as favoriteActions from 'actions/Favorite'
import * as shareActions from 'actions/Share'
import * as userAutocompleteActions from 'actions/UserAutocomplete'

const connectState = (state) => ({
  collection: Selectors.currentCollection(state),
  bundles: Selectors.sortedCollectionBundles(state),
  bundleId: state.Route.bundleId,
  collectionId: state.Route.collectionId,
  userAutocomplete: state.UserAutocomplete
})

const connectProps = {
  ...collectionActions,
  ...bundleActions,
  ...favoriteActions,
  ...shareActions,
  ...userAutocompleteActions
}

@ui({
  key: 'resource-navigation',
  state: { isOpen: false, position: null, resourceId: null }
})
@connect(connectState, connectProps)
export default class Container extends React.Component {
  static propTypes = {
    collection: ImmutablePropTypes.record
  }

  componentDidMount () {
    this.props.getCollection(this.props.collectionId)
  }

  getBundleUrl (collection, bundle) {
    return `/collection/${collection.get('id')}/bundle/${bundle.get('id')}`
  }

  getCollectionUrl () {
    return '/collection/' + this.props.collectionId
  }

  removeBundle (...args) {
    browserHistory.push(this.getCollectionUrl())
    this.props.removeBundle(...args)
  }

  renderShareResource () {
    let { bundles, ui } = this.props
    let resource = bundles.filter(bundle => bundle.id == ui.resourceId).first()

    if (!resource || !resource.full_response) return false

    return <ShareResource
        {...this.props}
        position={this.props.ui.position}
        resource={resource}
        resourceName='Bundle'/>
  }

  renderBundleList (bundles, collection, props) {
    return bundles.map((bundle, index) => {
      return <ListItem key={index}
        {...props}
        resource={bundle}
        resourceName={'Bundle'}
        url={this.getBundleUrl(collection, bundle)}
        Component={ListItem.Bundle}
        remove={::this.removeBundle}
        active={bundle.id === this.props.bundleId}
      />
    })
  }

  render () {
    const {
      collection,
      bundles,
      children,
      ...listItemProps
    } = this.props

    return (
      <ResourceNavigation bundleView={children}>
        <div className='bundles-navigation'>
          {this.renderShareResource()}

          <ResourceNavigation.Header>
            <div className='title-and-actions'>
              <h2 className='title'>{collection.name}</h2>
              <div className='nav'>
                <Link to='/search' className='icon search-icon' />
              </div>
            </div>
          </ResourceNavigation.Header>

          <ResourceNavigation.Body>
            <List>
              {this.renderBundleList(bundles, collection, listItemProps)}
            </List>
          </ResourceNavigation.Body>
        </div>
      </ResourceNavigation>
    )
  }
}
