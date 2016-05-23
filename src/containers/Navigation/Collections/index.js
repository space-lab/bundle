import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { List, ListItem, ResourceNavigation, ResourceFilters } from 'components'
import { nextId } from 'helpers'
import { sortedCollectionsSelector } from 'selectors'

import * as collectionActions from 'actions/Collection'
import * as favoriteActions from 'actions/Favorite'

const connectState = (state) => ({
  collections: sortedCollectionsSelector(state)
})

const connectProps = {
  ...collectionActions,
  ...favoriteActions
}

@ui({
  key: 'collection-navigation',
  state: { filter: 'recent' }
})
@connect(connectState, connectProps)
export default class CollectionsNavigationContainer extends React.Component {
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

  renderCollectionList (collections, listItemProps) {
    let { removeCollection, closeCollection, createCollection } = this.props

    return collections.map((collection, index) => {
      return <ListItem key={index}
        {...collection.toJS()}
        {...listItemProps}
        Component={ListItem.Collection}
        type={'collection'}
        remove={removeCollection}
        close={closeCollection}
        createCollection={createCollection}
      />
    })
  }

  render () {
    let { collections, generateNewCollection, ...listItemProps } = this.props

    return (
      <ResourceNavigation>
        <div className='bundles-navigation'>
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
