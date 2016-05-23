import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import { ResourceNavigation, List, ListItem } from 'components'
import { currentCollectionSelector, sortedCollectionBundlesSelector } from 'selectors'

import * as collectionActions from 'actions/Collection'
import * as bundleActions from 'actions/Bundle'
import * as favoriteActions from 'actions/Favorite'

const connectState = (state) => ({
  collection: currentCollectionSelector(state),
  bundles: sortedCollectionBundlesSelector(state),
  bundleId: state.Route.bundleId,
  collectionId: state.Route.collectionId
})

const connectProps = {
  ...collectionActions,
  ...bundleActions,
  ...favoriteActions
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
    let { removeBundle, collectionId } = this.props

    removeBundle(...args)
    browserHistory.goBack()
  }

  getBundleUrl (collection, bundle) {
    return `/collection/${collection.get('id')}/bundle/${bundle.get('id')}`
  }

  renderBundleList (bundles, collection, listItemProps) {
    return bundles.map((bundle, index) => {
      return <ListItem key={index}
        {...bundle.toJS()}
        {...listItemProps}
        Component={ListItem.Bundle}
        url={this.getBundleUrl(collection, bundle)}
        type={'bundle'}
        remove={::this.removeBundle}
        active={bundle.id === this.props.bundleId}
      />
    })
  }

  render () {
    let {
      collection,
      bundles,
      children,
      ...listItemProps
    } = this.props

    if (!collection || !collection.get('full_response')) return false

    return (
      <ResourceNavigation bundleView={children}>
        <div className='bundles-navigation'>
          <ResourceNavigation.Header>
            <h2 className='title'>{collection.name}</h2>
            <div className='nav'>
              <Link to='/search' className='icon search-icon' />
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
