import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { shouldShow } from 'helpers'
import { UserSelectors, SearchSelectors,
  BundleSelectors, RouteSelectors } from 'selectors'
import { List, ListItem, ShareResource,
  ResourceNavigation, SearchHeader, SearchBody } from 'components'
import { BundleActions, CollectionActions, FavoriteActions, SearchActions,
  ShareActions, UserActions } from 'actions'

let connectState = state => ({
  currentUser: UserSelectors.current(state),
  userAutocomplete: UserSelectors.autocompletes(state),
  searchResult: SearchSelectors.currentResult(state),
  bundleId: BundleSelectors.currentId(state),
  query: RouteSelectors.searchQuery(state)
})

let connectProps = {
  ...BundleActions,
  ...CollectionActions,
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
  connect(connectState, connectProps),
  withState('shareModal', 'updateShareModal', modalState)
)

class SearchNavigationContainer extends React.Component {
  static propTypes = {
    searchResult: ImmutablePropTypes.map,
    currentUser: ImmutablePropTypes.record,
    query: React.PropTypes.string,
    removeBundle: React.PropTypes.func,
    favorite: React.PropTypes.func,
    unfavorite: React.PropTypes.func,
    shareModal: React.PropTypes.object.isRequired,
    updateShareModal: React.PropTypes.func.isRequired
  }

  componentWillMount () {
    if (this.props.query) this.props.getSearchResult(this.props.query)
  }

  componentWillReceiveProps (nextProps) {
    const thisPropsQuery = this.props.query
    const nextPropsQuery = nextProps.query

    if (!nextPropsQuery) {
      nextProps.getSearchResult()
    } else if (thisPropsQuery !== nextPropsQuery && nextPropsQuery) {
      nextProps.getSearchResult(nextPropsQuery)
    }
  }

  noResult (search) {
    return !search.get('bundles').size && !search.get('collections').size
  }

  renderList (searchResult, resourceName, component) {
    let props = this.props

    return (
      <List>
        <h4 className='name' style={shouldShow(searchResult.size > 0)}>
          {resourceName}s
        </h4>

        {
          searchResult.map((item, index) => (
            <ListItem
              key={index}
              active={resourceName === 'Bundle' && item.id === props.bundleId}
              currentUser={props.currentUser}
              resource={item}
              resourceName={resourceName}
              Component={component}
              remove={props['remove' + resourceName]}
              favorite={props.favorite}
              unfavorite={props.unfavorite}
              getBundle={props.getBundle}
              getCollection={props.getCollection}
              updateShareModal={props.updateShareModal} />
          ))
        }
      </List>
    )
  }

  renderShareResource () {
    let props = this.props

    let resource = null
    let resourceName = null

    props.searchResult.get('bundles').forEach(item => {
      if (item.id === props.shareModal.resourceId) {
        resource = item
        resourceName = 'Bundle'
      }
    })

    props.searchResult.get('collections').forEach(item => {
      if (item.id === props.shareModal.resourceId) {
        resource = item
        resourceName = 'Collection'
      }
    })

    if (!resource || !props.shareModal.isOpen) return false

    return <ShareResource
      resource={resource}
      resourceId={resource.id}
      resourceName={resourceName}
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
      removeUrlShare={props.removeUrlShare} />
  }

  render () {
    let props = this.props
    let bundles = props.searchResult.get('bundles')
    let collections = props.searchResult.get('collections')

    return (
      <ResourceNavigation>
        {this.renderShareResource()}

        <ResourceNavigation.Header>
          <SearchHeader>
            <input
              className='search-input'
              autoFocus
              type='text'
              placeholder='Search...'
              value={props.query || ''}
              onChange={e => browserHistory.push(`/search/${e.target.value}`)} />

            <Link to='/bundles' className='icon close-icon'/>
          </SearchHeader>
        </ResourceNavigation.Header>

        <ResourceNavigation.Body>
          <SearchBody>
            {
              this.noResult(props.searchResult)
              ? <div className='search-note'>Search Bundles and Collections</div>
              : <div className='search-results'>
                  <h3 className='title'>Search results</h3>
                  {this.renderList(bundles, 'Bundle', ListItem.Bundle)}
                  {this.renderList(collections, 'Collection', ListItem.Collection)}
              </div>
            }
          </SearchBody>
        </ResourceNavigation.Body>
      </ResourceNavigation>
    )
  }
}

export default enhancer(SearchNavigationContainer)
