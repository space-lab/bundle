import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import { browserHistory } from 'react-router'
import { BundleSelectors, CollectionSelectors, FavoriteSelectors, UserSelectors } from 'selectors'
import { BundleActions, CollectionActions, FavoriteActions, ShareActions, UserActions } from 'actions'
import { ResourceNavigation, List, ListItem, ShareResource } from 'components'

let connectState = state => ({
  bundles: BundleSelectors.all(state),
  bundleId: BundleSelectors.currentId(state),
  collections: CollectionSelectors.all(state),
  collectionId: CollectionSelectors.currentId(state),
  favorites: FavoriteSelectors.sorted(state),
  currentUser: UserSelectors.current(state),
  userAutocomplete: UserSelectors.autocompletes(state)
})

let connectProps = {
  ...BundleActions,
  ...CollectionActions,
  ...FavoriteActions,
  ...ShareActions,
  ...UserActions
}

let modalState = {
  isOpen: false,
  position: null,
  resourceId: null
}

let enhancer = compose(
  connect(connectState, connectProps),
  withState('shareModal', 'updateShareModal', modalState)
)

class FavoriteNavigationContainer extends React.Component {
  static propTypes = {
    favorites: ImmutablePropTypes.list.isRequired,
    bundles: ImmutablePropTypes.map.isRequired,
    collections: ImmutablePropTypes.map.isRequired,
    removeBundle: React.PropTypes.func.isRequired,
    removeCollection: React.PropTypes.func.isRequired,
    createCollection: React.PropTypes.func.isRequired,
    collectionId: React.PropTypes.string,
    bundleId: React.PropTypes.string,
    shareModal: React.PropTypes.object.isRequired,
    updateShareModal: React.PropTypes.func.isRequired,
  }

  componentWillMount () {
    this.props.getFavorites()
  }

  removeBundle (...args) {
    this.props.removeBundle(...args)
    browserHistory.goBack()
  }

  renderShareResource () {
    let props = this.props
    let favorite = props.favorites.find(fav => fav.id == props.shareModal.resourceId)

    if (!favorite || !props.shareModal.isOpen) return false

    return <ShareResource
      resource={favorite}
      resourceId={favorite.id}
      resourceName={favorite.type}
      userAutocomplete={props.userAutocomplete}
      shareModal={props.shareModal}
      updateShareModal={props.updateShareModal}
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
        updateShareModal={props.updateShareModal}/>
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
        updateShareModal={props.updateShareModal} />
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
      </ResourceNavigation>
    )
  }
}

export default enhancer(FavoriteNavigationContainer)
