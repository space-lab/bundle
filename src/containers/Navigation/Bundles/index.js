import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import {
  List,
  ListItem,
  ResourceNavigation,
  ResourceFilters,
  ShareResource,
  LoadMore
} from 'components'

import * as Selectors from 'selectors'
import * as bundleActions from 'actions/Bundle'
import * as collectionActions from 'actions/Collection'
import * as searchActions from 'actions/Search'
import * as favoriteActions from 'actions/Favorite'
import * as shareActions from 'actions/Share'
import * as userActions from 'actions/User'

const connectState = (state, props) => ({
  bundles: Selectors.Bundle.currents(state, props),
  bundleId: Selectors.Bundle.currentId(state),
  currentUser: Selectors.User.current(state),
  userAutocomplete: Selectors.User.autocompletes(state),
  search: Selectors.Search.result(state)
})

const connectProps = {
  ...bundleActions,
  ...searchActions,
  ...favoriteActions,
  ...shareActions,
  ...userActions
}

@ui({
  key: 'resource-navigation',
  state: { filter: 'recent', isOpen: false, position: null, resourceId: null, page: 1 }
})
@connect(connectState, connectProps)
export default class BundleNavigationContainer extends React.Component {
  static propTypes = {
    bundles: ImmutablePropTypes.list,
    search: ImmutablePropTypes.map
  }

  componentWillMount () {
    this.props.getBundles(this.props.ui.page)
  }

  removeBundle (...args) {
    this.props.removeBundle(...args)
    browserHistory.push('/bundles')
  }

  changeFilter (filter, e) {
    e.preventDefault()
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

  renderBundleList (bundles, props) {
    return bundles.map((bundle, index) => {
      return <ListItem
        key={index}
        currentUser={props.currentUser}
        resource={bundle}
        resourceName={'Bundle'}
        Component={ListItem.Bundle}
        active={bundle.id === this.props.bundleId}
        remove={::this.removeBundle}
        favorite={props.favorite}
        unfavorite={props.unfavorite}
        getBundle={props.getBundle}
        updateUI={props.updateUI}/>
    })
  }

  render () {
    let { bundles, search, ...props } = this.props

    return (
      <ResourceNavigation>
        <div className='bundles-navigation'>
          {this.renderShareResource()}

          <ResourceNavigation.Header>
            <div className='title-and-actions'>
              <h2 className='title'>Bundles</h2>

              <div className='nav'>
                <Link to='/search' className='icon search-icon' />
              </div>
            </div>
            <ResourceFilters />
          </ResourceNavigation.Header>

          <ResourceNavigation.Body>
            <List>
              {this.renderBundleList(bundles, props)}

              <LoadMore
                show={bundles && bundles.size >= 15}
                page={props.ui.page}
                getBundles={props.getBundles}
                updateUI={props.updateUI}/>
            </List>
          </ResourceNavigation.Body>
        </div>
      </ResourceNavigation>
    )
  }
}
