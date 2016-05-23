import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import { ResourceNavigation, List, ListItem } from 'components'
import { NEW_BUNDLE_ID } from 'constants'
import { sortedBundlesSelector } from 'selectors'

import * as bundleActions from 'actions/Bundle'
import * as searchActions from 'actions/Search'
import * as favoriteActions from 'actions/Favorite'

import './index.css'

const connectState = (state) => ({
  bundles: sortedBundlesSelector(state),
  bundleId: state.Route.bundleId,
  search: state.Search
})

const connectProps = {
  ...bundleActions,
  ...searchActions,
  ...favoriteActions
}

@connect(connectState, connectProps)
export default class Container extends React.Component {
  static propTypes = {
    bundles: ImmutablePropTypes.list,
    search: ImmutablePropTypes.map
  }

  constructor (props) {
    super(props)
    props.getBundles()
  }

  removeBundle (...args) {
    this.props.removeBundle(...args)
    browserHistory.push('/bundles')
  }

  renderBundleList (bundles, listItemProps) {
    return bundles.map((bundle, index) => {
      return <ListItem
        key={index}
        {...bundle.toJS()}
        {...listItemProps}
        Component={ListItem.Bundle}
        url={'/bundle/' + bundle.id}
        type={'bundle'}
        active={bundle.id === this.props.bundleId}
        remove={::this.removeBundle}
      />
    })
  }

  render () {
    let { bundles, search, ...listItemProps } = this.props
    let styles = { 'display': search.get('open') ? 'none' : 'block' }

    return (
      <ResourceNavigation>
        <div className='bundles-navigation'>
          <ResourceNavigation.Header>
            <h2 style={styles} className='title'>Bundles</h2>

            <div className='nav'>
              <Link to='/search' className='icon search-icon' />
            </div>
          </ResourceNavigation.Header>

          <ResourceNavigation.Body>
            <List>
              {this.renderBundleList(bundles, listItemProps)}
            </List>
          </ResourceNavigation.Body>
        </div>
      </ResourceNavigation>
    )
  }
}
