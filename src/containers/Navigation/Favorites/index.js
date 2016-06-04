import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { ResourceNavigation, List, ListItem } from 'components'
import Selectors from 'selectors'

import * as bundleActions from 'actions/Bundle'
import * as collectionActions from 'actions/Collection'
import * as favoriteActions from 'actions/Favorite'

const connectState = (state) => ({
  favorites: Selectors.sortedFavorites(state),
  bundles: state.Bundle.get('byId'),
  collections: state.Collection.get('byId'),
  bundleId: state.Route.bundleId,
  collectionId: state.Route.collectionId
})

const connectProps = {
  ...bundleActions,
  ...collectionActions,
  ...favoriteActions
}

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

  renderCollectionListItem (collection, index) {
    const { ...listItemProps, collectionId, createCollection, removeCollection } = this.props

    return (
      <ListItem
        key={index}
        Component={ListItem.Collection}
        {...collection.toJS()} {...listItemProps}
        url={'/collection/' + collection.id}
        type={'collection'}
        active={collection.id === collectionId}
        createCollection={createCollection}
        remove={removeCollection}
      />
    )
  }

  renderBundleListItem (bundle, index) {
    const { ...listItemProps, bundleId, removeBundle } = this.props

    return (
      <ListItem
        key={index}
        Component={ListItem.Bundle}
        {...bundle.toJS()} {...listItemProps}
        url={'/bundle/' + bundle.id}
        type={'bundle'}
        active={bundle.id === bundleId}
        remove={removeBundle}
      />
    )
  }

  renderList () {
    const { favorites, bundles, collections } = this.props

    return favorites.map((item, index) => {
      let id = item.get('id')
      let type = item.get('type')

      if (type == 'Bundle') {
        return this.renderBundleListItem(bundles.get(id), index)
      } else {
        return this.renderCollectionListItem(collections.get(id), index)
      }
    })
  }

  render () {
    return (
      <ResourceNavigation>
        <div className='favorites-navigation'>
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
