import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { ResourceNavigation, List, ListItem, ShareResource } from 'components'

import * as Selectors from 'selectors'
import * as bundleActions from 'actions/Bundle'
import * as collectionActions from 'actions/Collection'
import * as favoriteActions from 'actions/Favorite'
import * as shareActions from 'actions/Share'
import * as userActions from 'actions/User'

const connectState = (state) => ({
  currentUser: Selectors.User.current(state),
  favorites: Selectors.Favorite.sortedFavorites(state),
  bundles: Selectors.Bundle.all(state),
  collections: Selectors.Collection.collections(state),
  bundleId: state.Route.bundleId,
  collectionId: state.Route.collectionId,
  userAutocomplete: state.User.UserAutocomplete
})

const connectProps = {
  ...bundleActions,
  ...collectionActions,
  ...favoriteActions,
  ...shareActions,
  ...userActions,
}

@ui({
  key: 'resource-navigation',
  state: { isOpen: false, position: null, resourceId: null }
})
@connect(connectState, connectProps)
export default class Container extends React.Component {
  static propTypes = {
    favorites: ImmutablePropTypes.list.isRequired,
    bundles: ImmutablePropTypes.map.isRequired,
    collections: ImmutablePropTypes.map.isRequired,
    removeBundle: React.PropTypes.func.isRequired,
    removeCollection: React.PropTypes.func.isRequired,
    createCollection: React.PropTypes.func.isRequired,
    collectionId: React.PropTypes.string,
    bundleId: React.PropTypes.string
  }

  constructor (props) {
    super(props)
    props.getFavorites()
  }

  removeBundle (...args) {
    this.props.removeBundle(...args)
    browserHistory.goBack()
  }

  renderShareResource () {
    let props = this.props
    let { favorites, bundles, collections, ui } = props
    let favorite = favorites.find(fav => fav.id == ui.resourceId)

    if (!favorite) return false

    return <ShareResource
      position={ui.position}
      resource={favorite}
      resourceName={favorite.type}
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

  renderCollectionListItem (collection, index) {
    const { ...props, collectionId, removeCollection, closeCollection } = this.props

    return (
      <ListItem
        key={index}
        currentUser={props.currentUser}
        resource={collection}
        resourceName={'Collection'}
        Component={ListItem.Collection}
        active={collection.id === collectionId}
        close={closeCollection}
        remove={removeCollection}
        favorite={props.favorite}
        unfavorite={props.unfavorite}
        getCollection={props.getCollection}
        updateUI={props.updateUI}/>
    )
  }

  renderBundleListItem (bundle, index) {
    const { ...props, bundleId, removeBundle } = this.props

    return (
      <ListItem
        key={index}
        currentUser={props.currentUser}
        resource={bundle}
        resourceName={'Bundle'}
        Component={ListItem.Bundle}
        active={bundle.id === bundleId}
        remove={removeBundle}
        getBundle={props.getBundle}
        favorite={props.favorite}
        unfavorite={props.unfavorite}
        updateUI={props.updateUI}/>
    )
  }

  renderList () {
    const { favorites } = this.props

    return favorites.map((item, index) => {
      let type = item.get('type')

      if (type === 'Bundle') {
        return this.renderBundleListItem(item, index)
      } else {
        return this.renderCollectionListItem(item, index)
      }
    })
  }

  render () {
    return (
      <ResourceNavigation>
        <div className='favorites-navigation'>
          {this.renderShareResource()}

          <ResourceNavigation.Header>
            <div className='title-and-actions'>
              <div className='top-nav'>
                <h2 className='title'>Favorites</h2>
              </div>
            </div>
          </ResourceNavigation.Header>
          <ResourceNavigation.Body>
            <List>
              {this.renderList()}
            </List>
          </ResourceNavigation.Body>
        </div>
      </ResourceNavigation>
    )
  }
}
