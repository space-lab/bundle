import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { BundleSelectors, CollectionSelectors,
  UserSelectors, SearchSelectors } from 'selectors'
import { ResourceNavigation, List, ListItem, ShareResource,
  CollectionActionsModal, Permission, Editable } from 'components'
import { CollectionActions, BundleActions, FavoriteActions,
  ShareActions, UserActions, AlertActions } from 'actions'

let connectState = state => ({
  bundles: BundleSelectors.sortedCollectionBundles(state),
  bundleId: BundleSelectors.currentId(state),
  collection: CollectionSelectors.current(state),
  collectionId: CollectionSelectors.currentId(state),
  currentUser: UserSelectors.current(state),
  userAutocomplete: UserSelectors.autocompletes(state)
})

let connectProps = {
  ...BundleActions,
  ...CollectionActions,
  ...FavoriteActions,
  ...ShareActions,
  ...UserActions,
  ...AlertActions
}

let modalState = {
  isOpen: false,
  position: null,
  resourceId: null
}

let enhancer = compose(
  connect(connectState, connectProps),
  withState('shareModal', 'updateShareModal', modalState),
  withState('actionsModalOpen', 'updateActionsModalOpen', false),
  withState('editCollectionMode', 'updateEditCollectionMode', false)
)

class CollectionBundlesNavigationContainer extends React.Component {
  static propTypes = {
    collection: ImmutablePropTypes.record,
    shareModal: React.PropTypes.object.isRequired,
    updateShareModal: React.PropTypes.func.isRequired,
    actionsModalOpen: React.PropTypes.bool.isRequired,
    updateActionsModalOpen: React.PropTypes.func.isRequired,
    editCollectionMode: React.PropTypes.bool.isRequired,
    updateEditCollectionMode: React.PropTypes.func.isRequired,
  }

  componentDidMount () {
    let { collection, collectionId, getCollection } = this.props

    if (!collection || !collection.id) getCollection(collectionId)
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

  leaveCollection () {
    let { collection, currentUser, leaveShare, addAlert } = this.props
    let shareId = collection.shareIdFor(currentUser.id)

    leaveShare(shareId, collection.id, 'Collection').then(() => {
      browserHistory.push('/collections')
      addAlert('success', 'You\'ve just left Collection 😢')
    })
  }


  renderShareResource () {
    let props = this.props
    let resource = props.bundles.find(bundle => bundle.id == props.shareModal.resourceId)

    if (!resource || !props.shareModal.isOpen) return false

    return <ShareResource
      resource={resource}
      resourceId={resource.id}
      resourceName='Bundle'
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
      removeUrlShare={props.removeUrlShare} />
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
        updateShareModal={props.updateShareModal} />
    })
  }

  render () {
    const props = this.props
    const {
      collection,
      bundles,
      currentUser,
      ui,
      children,
    } = this.props

    const showActions = collection.canEdit(currentUser.id) || collection.canLeave(currentUser.id)

    return (
      <ResourceNavigation bundleView={children}>
        {this.renderShareResource()}

        <ResourceNavigation.Header>
          <div className='title-and-actions'>
            <h2 className='title'>
              <Editable
                value={collection.name}
                placeholder='Name Collection...'
                editMode={props.editCollectionMode || false}
                autoFocus
                enterAction={name => props.updateCollection(collection.id, { name })
                  .then(_ => props.updateEditCollectionMode(false))} />
            </h2>
            <div className='nav'>
              <Link to='/search' className='icon search-icon' />

              <Permission allow={showActions}>
                <span
                  className='icon more-icon'
                  onClick={_ => props.updateActionsModalOpen(true)} />
              </Permission>

              <Permission allow={showActions && (props.actionsModalOpen || false)}>
                <CollectionActionsModal
                  isOpen={props.actionsModalOpen || false}
                  closeModal={_ => props.updateActionsModalOpen(false)}>
                  <Permission allow={props.collection.canEdit(props.currentUser.id)}>
                    <a onClick={_ => {
                      props.updateEditCollectionMode(true)
                      props.updateActionsModalOpen(false)
                    }}>Edit</a>
                  </Permission>

                  <Permission allow={props.collection.canLeave(props.currentUser.id)}>
                    <a onClick={::this.leaveCollection}>Leave</a>
                  </Permission>
                </CollectionActionsModal>
              </Permission>
            </div>
          </div>
        </ResourceNavigation.Header>

        <ResourceNavigation.Body>
          <List>
            {this.renderBundleList(bundles, collection, props)}
          </List>
        </ResourceNavigation.Body>
      </ResourceNavigation>
    )
  }
}

export default enhancer(CollectionBundlesNavigationContainer)
