import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import { Link } from 'react-router'
import { nextId } from 'helpers'
import { CollectionSelectors, UserSelectors, SearchSelectors } from 'selectors'
import { CollectionActions, FavoriteActions, ShareActions, UserActions} from 'actions'
import { List, ListItem, ResourceNavigation, ResourceFilters, ShareResource } from 'components'

let connectState = (state, props) => ({
  collections: CollectionSelectors.currents(state, props),
  currentUser: UserSelectors.current(state),
  userAutocomplete: UserSelectors.autocompletes(state)
})

let connectProps = {
  ...CollectionActions,
  ...FavoriteActions,
  ...ShareActions,
  ...UserActions
}

const initialState = {
  isOpen: false,
  position: null,
  resourceId: null
}

let enhancer = compose(
  withState('resourceFilter', 'updateResourceFilter', 'recent'),
  withState('shareModal', 'updateShareModal', initialState),
  connect(connectState, connectProps)
)

class NavigationCollectionContainer extends React.Component {
  static propTypes = {
    collections: ImmutablePropTypes.list,
    resourceFilter: React.PropTypes.string.isRequired,
    updateResourceFilter: React.PropTypes.func.isRequired,
    shareModal: React.PropTypes.object.isRequired,
    updateShareModal: React.PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.getCollections()
  }

  generateNewCollection () {
    let id = nextId(this.props.collections)
    this.props.generateNewCollection(id)
  }

  renderShareResource () {
    let props = this.props
    let { collections, shareModal, updateShareModal } = props
    let resource = collections.find(col => col.id === shareModal.resourceId)

    if (!resource || !shareModal.isOpen) return false

    return <ShareResource
      resource={resource}
      resourceName='Collection'
      userAutocomplete={props.userAutocomplete}
      shareModal={shareModal}
      updateShareModal={updateShareModal}
      changeSharePermission={props.changeSharePermission}
      removeShare={props.removeShare}
      inviteUsers={props.inviteUsers}
      getAutocompleteUsers={props.getAutocompleteUsers}
      resetAutocompleteUsers={props.resetAutocompleteUsers}
      getShareUrl={props.getShareUrl}
      changeUrlPermission={props.changeUrlPermission}
      removeUrlShare={props.removeUrlShare}/>
  }

  renderCollectionList (collections, props) {
    let { removeCollection, closeCollection, createCollection, updateShareModal } = this.props

    return collections.map((collection, index) => {
      return <ListItem
        key={index}
        currentUser={props.currentUser}
        resource={collection}
        resourceName={'Collection'}
        Component={ListItem.Collection}
        remove={removeCollection}
        close={closeCollection}
        createCollection={createCollection}
        favorite={props.favorite}
        unfavorite={props.unfavorite}
        getCollection={props.getCollection}
        updateShareModal={updateShareModal}
      />
    })
  }

  render () {
    let { collections, ...listItemProps, resourceFilter, updateResourceFilter } = this.props
    return (
      <ResourceNavigation>
        {this.renderShareResource()}

        <ResourceNavigation.Header>
          <div className='title-and-actions'>
            <h2 className='title'>Collections</h2>
            <div className='nav'>
              <span
                className='icon create-collection-icon'
                onClick={::this.generateNewCollection}
              />

              <Link to='/search' className='icon search-icon' />
            </div>
          </div>

          <ResourceFilters
            resourceFilter={resourceFilter}
            updateResourceFilter={updateResourceFilter} />
        </ResourceNavigation.Header>

        <ResourceNavigation.Body>
          <List>
            {this.renderCollectionList(collections, listItemProps)}
          </List>
        </ResourceNavigation.Body>
      </ResourceNavigation>
    )
  }
}

export default enhancer(NavigationCollectionContainer)
