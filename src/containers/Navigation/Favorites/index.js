import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { ResourceNavigation, List, ListItem } from 'components'
import Selectors from 'selectors'

import * as bundleActions from 'actions/Bundle'
import * as collectionActions from 'actions/Collection'
import * as favoriteActions from 'actions/Favorite'
import * as shareActions from 'actions/Share'
import * as userAutocompleteActions from 'actions/UserAutocomplete'

const connectState = (state) => ({
  favorites: Selectors.sortedFavorites(state),
  bundles: state.Bundle.get('byId'),
  collections: state.Collection.get('byId'),
  bundleId: state.Route.bundleId,
  collectionId: state.Route.collectionId,
  userAutocomplete: state.UserAutocomplete
})

const connectProps = {
  ...bundleActions,
  ...collectionActions,
  ...favoriteActions,
  ...shareActions,
  ...userAutocompleteActions
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
    const { ...props, collectionId, removeCollection, closeCollection } = this.props

    return (
      <ListItem
        {...props}
        key={index}
        resource={collection}
        resourceName={'Collection'}
        Component={ListItem.Collection}
        active={collection.id === collectionId}
        close={closeCollection}
        remove={removeCollection}
      />
    )
  }

  renderBundleListItem (bundle, index) {
    const { ...props, bundleId, removeBundle } = this.props

    return (
      <ListItem
        {...props}
        key={index}
        resource={bundle}
        resourceName={'Bundle'}
        Component={ListItem.Bundle}
        active={bundle.id === bundleId}
        remove={removeBundle}
      />
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
