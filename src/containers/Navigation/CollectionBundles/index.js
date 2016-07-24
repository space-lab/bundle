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
import * as userActions from 'actions/User'

const connectState = (state) => ({
  collection: Selectors.currentCollection(state),
  bundles: Selectors.sortedCollectionBundles(state),
  bundleId: state.Route.bundleId,
  collectionId: state.Route.collectionId,
  userAutocomplete: Selectors.autocompleteUsers(state),
  currentUser: Selectors.currentUser(state)
})

const connectProps = {
  ...collectionActions,
  ...bundleActions,
  ...favoriteActions,
  ...shareActions,
  ...userActions
}

@ui({
  key: 'resource-navigation',
  state: { isOpen: false, position: null, resourceId: null }
})
@connect(connectState, connectProps)
export default class CollectionBundlesNavigationContainer extends React.Component {
  static propTypes = {
    collection: ImmutablePropTypes.record
  }

  componentDidMount () {
    let { collection, collectionId, getCollection } = this.props
    if (!collection) getCollection(collectionId)
  }

  getBundleUrl (collection, bundle) {
    return `/collection/${collection.slug}-${collection.id}/bundle/${bundle.slug}-${bundle.id}`
  }

  getCollectionUrl () {
    return `/collection/${this.props.collection.slug}-${this.props.collection.id}`
  }

  removeBundle (...args) {
    browserHistory.push(this.getCollectionUrl())
    this.props.removeBundle(...args)
  }

  renderShareResource () {
    let props = this.props
    let { bundles, ui } = props
    let resource = bundles.find(bundle => bundle.id == ui.resourceId)

    if (!resource) return false

    return <ShareResource
      position={ui.position}
      resource={resource}
      resourceName='Bundle'
      userAutocomplete={props.userAutocomplete}
      ui={ui}
      updateUI={props.updateUI}
      changeSharePermission={props.changeSharePermission}
      removeShare={props.removeShare}
      inviteUsers={props.inviteUsers}
      getAutocompleteUsers={props.getAutocompleteUsers}
      resetAutocompleteUsers={props.resetAutocompleteUsers}
      getShareUrl={props.getShareUrl}
      changeUrlPermission={props.changeUrlPermission}
      removeUrlShare={props.removeUrlShare}/>
  }

  renderBundleList (bundles, collection, props) {
    return bundles.map((bundle, index) => {
      return <ListItem key={index}
        currentUser={props.currentUser}
        resource={bundle}
        resourceName={'Bundle'}
        active={bundle.id === props.bundleId}
        url={this.getBundleUrl(collection, bundle)}
        Component={ListItem.Bundle}
        remove={::this.removeBundle}
        favorite={props.favorite}
        unfavorite={props.unfavorite}
        getBundle={props.getBundle}
        updateUI={props.updateUI}/>
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
