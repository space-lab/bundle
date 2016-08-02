import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { BundleSelectors, UserSelectors, SearchSelectors } from 'selectors'
import { BundleActions, FavoriteActions, SearchActions,
  ShareActions, UserActions } from 'actions'
import { List, ListItem, ResourceNavigation, ResourceFilters,
  ShareResource, LoadMore } from 'components'

const connectState = (state, props) => ({
  bundles: BundleSelectors.currents(state, props),
  bundleId: BundleSelectors.currentId(state),
  currentUser: UserSelectors.current(state),
  userAutocomplete: UserSelectors.autocompletes(state),
  search: SearchSelectors.result(state)
})

let connectProps = {
  ...BundleActions,
  ...FavoriteActions,
  ...SearchActions,
  ...ShareActions,
  ...UserActions
}

let modalState = {
  isOpen: false,
  position: null,
  resourceId: null
}

let enhancer = compose(
  withState('resourceFilter', 'updateResourceFilter', 'recent'),
  withState('page', 'updatePage', 1),
  connect(connectState, connectProps),
  withState('shareModal', 'updateShareModal', modalState)
)

class BundleNavigationContainer extends React.Component {
  static propTypes = {
    bundles: ImmutablePropTypes.list,
    search: ImmutablePropTypes.map,
    resourceFilter: React.PropTypes.string.isRequired,
    updateResourceFilter: React.PropTypes.func.isRequired,
    shareModal: React.PropTypes.object.isRequired,
    updateShareModal: React.PropTypes.func.isRequired,
    page: React.PropTypes.number.isRequired,
    updatePage: React.PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.getBundles(this.props.page)
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
    let resource = props.bundles.find(bundle =>
      bundle.id === props.shareModal.resourceId)

    if (!resource || !props.shareModal.isOpen) return false

    return <ShareResource
      resource={resource}
      resourceName='Bundle'
      userAutocomplete={props.userAutocomplete}
      shareModal={props.shareModal}
      updateShareModal={props.updateShareModal}
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
        updateShareModal={props.updateShareModal} />
    })
  }

  render () {
    let { bundles, search, ...props, resourceFilter, updateResourceFilter } = this.props

    return <ResourceNavigation>
      {this.renderShareResource()}

      <ResourceNavigation.Header>
        <div className='title-and-actions'>
          <h2 className='title'>Bundles</h2>

          <div className='nav'>
            <Link to='/search' className='icon search-icon' />
          </div>
        </div>
        <ResourceFilters
          resourceFilter={resourceFilter}
          updateResourceFilter={updateResourceFilter} />
      </ResourceNavigation.Header>

      <ResourceNavigation.Body>
        <List>
          {this.renderBundleList(bundles, props)}

          <LoadMore
            show={bundles && bundles.size >= 15}
            page={props.page}
            updatePage={props.updatePage}
            getBundles={props.getBundles} />
        </List>
      </ResourceNavigation.Body>
    </ResourceNavigation>
  }
}

export default enhancer(BundleNavigationContainer)
