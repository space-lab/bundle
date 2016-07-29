import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import { BundleSelectors, CollectionSelectors,
  UserSelectors, SearchSelectors } from 'selectors'
import { ResourceNavigation, List, ListItem, ShareResource,
  CollectionActionsModal, Permission, Editable } from 'components'
import { CollectionActions, BundleActions, FavoriteActions,
  ShareActions, UserActions, AlertActions } from 'actions'

const connectState = (state) => ({
  bundles: BundleSelectors.sortedCollectionBundles(state),
  bundleId: BundleSelectors.currentId(state),
  collection: CollectionSelectors.current(state),
  collectionId: CollectionSelectors.currentId(state),
  currentUser: UserSelectors.current(state),
  userAutocomplete: UserSelectors.autocompletes(state)
})

const connectProps = {
  ...BundleActions,
  ...CollectionActions,
  ...FavoriteActions,
  ...ShareActions,
  ...UserActions,
  ...AlertActions
}

@ui({
  key: 'resource-navigation',
  state: {
    isOpen: false,
    editCollectionMode: false,
    actionsModalIsOpen: false,
    position: null,
    resourceId: null
  }
})
@connect(connectState, connectProps)
export default class CollectionBundlesNavigationContainer extends React.Component {
  static propTypes = {
    collection: ImmutablePropTypes.record
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
                editMode={ui.editCollectionMode}
                autoFocus
                enterAction={name => {
                  props.updateCollection(collection.id, { name }).then(()=> {
                    props.updateUI('editCollectionMode', false)
                  })
                }} />
            </h2>
            <div className='nav'>
              <Link to='/search' className='icon search-icon' />

              <Permission allow={showActions}>
                <span
                  className='icon more-icon'
                  onClick={e => props.updateUI('actionsModalIsOpen', true)} />
              </Permission>

              <Permission allow={showActions}>
                <CollectionActionsModal
                  isOpen={props.ui.actionsModalIsOpen || false}
                  closeModal={() => props.updateUI('actionsModalIsOpen', false)}>
                  <Permission allow={props.collection.canEdit(props.currentUser.id)}>
                    <a onClick={()=> props.updateUI({
                      editCollectionMode: true,
                      actionsModalIsOpen: false
                    })}>Edit</a>
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
