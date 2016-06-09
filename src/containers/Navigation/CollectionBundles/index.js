import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import { ResourceNavigation, List, ListItem } from 'components'
import Selectors from 'selectors'

import * as collectionActions from 'actions/Collection'
import * as bundleActions from 'actions/Bundle'
import * as favoriteActions from 'actions/Favorite'
import * as shareActions from 'actions/Share'
import * as userAutocompleteActions from 'actions/UserAutocomplete'

const connectState = (state) => ({
  collection: Selectors.currentCollection(state),
  bundles: Selectors.sortedCollectionBundles(state),
  bundleId: state.Route.bundleId,
  collectionId: state.Route.collectionId,
  userAutocomplete: state.UserAutocomplete
})

const connectProps = {
  ...collectionActions,
  ...bundleActions,
  ...favoriteActions,
  ...shareActions,
  ...userAutocompleteActions
}

@connect(connectState, connectProps)
export default class Container extends React.Component {
  static propTypes = {
    collection: ImmutablePropTypes.record
  }

  constructor (props) {
    super(props)
    props.getCollection(props.collectionId)
  }

  removeBundle (...args) {
    const { removeBundle, collectionId } = this.props

    removeBundle(...args)
      .then(() => browserHistory.goBack())
  }

  getBundleUrl (collection, bundle) {
    return `/collection/${collection.get('id')}/bundle/${bundle.get('id')}`
  }

  renderBundleList (bundles, collection, props) {
    return bundles.map((bundle, index) => {
      return <ListItem key={index}
        {...props}
        resource={bundle}
        resourceName={'Bundle'}
        url={this.getBundleUrl(collection, bundle)}
        Component={ListItem.Bundle}
        remove={::this.removeBundle}
        active={bundle.id === this.props.bundleId}
      />
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
