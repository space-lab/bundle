import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { List, ListItem, ResourceNavigation, ResourceFilters, ShareResource } from 'components'
import { nextId } from 'helpers'
import Selectors from 'selectors'

import * as collectionActions from 'actions/Collection'
import * as favoriteActions from 'actions/Favorite'
import * as shareActions from 'actions/Share'
import * as userAutocompleteActions from 'actions/UserAutocomplete'

const connectState = (state, props) => ({
  currentUser: Selectors.currentUser(state),
  collections: Selectors.currentCollections(state, props),
  userAutocomplete: state.UserAutocomplete
})

const connectProps = {
  ...collectionActions,
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
    collections: ImmutablePropTypes.list
  }

  constructor (props) {
    super(props)
    props.getCollections()
  }

  generateNewCollection () {
    let id = nextId(this.props.collections)
    this.props.generateNewCollection(id)
  }

  renderShareResource () {
    let props = this.props
    let { collections, ui } = props
    let resource = collections.find(col => col.id == ui.resourceId)

    if (!resource) return false

    return <ShareResource
      position={this.props.ui.position}
      resource={resource}
      resourceName='Collection'
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

  renderCollectionList (collections, props) {
    let { removeCollection, closeCollection, createCollection } = this.props

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
        updateUI={props.updateUI}/>
    })
  }

  render () {
    let { collections, ...listItemProps } = this.props

    return (
      <ResourceNavigation>
        <div className='bundles-navigation'>
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

            <ResourceFilters />
          </ResourceNavigation.Header>

          <ResourceNavigation.Body>
            <List>
              {this.renderCollectionList(collections, listItemProps)}
            </List>
          </ResourceNavigation.Body>
        </div>
      </ResourceNavigation>
    )
  }
}
