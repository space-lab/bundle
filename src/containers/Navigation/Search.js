import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { shouldShow } from 'helpers'
import { UserSelectors, SearchSelectors } from 'selectors'
import { List, ListItem, ShareResource, ResourceNavigation,
  Search, SearchHeader, SearchBody } from 'components'
import { BundleActions, CollectionActions, FavoriteActions, SearchActions,
  ShareActions, UserActions } from 'actions'

let connectState = (state) => ({
  currentUser: UserSelectors.current(state),
  userAutocomplete: UserSelectors.autocompletes(state),
  searchResult: SearchSelectors.currentResult(state),
  query: state.Route.searchQuery
})

let connectProps = {
  ...BundleActions,
  ...CollectionActions,
  ...FavoriteActions,
  ...SearchActions,
  ...ShareActions,
  ...UserActions
}

@ui({
  key: 'resource-navigation',
  state: { isOpen: false, position: null, resourceId: null }
})
@connect(connectState, connectProps)
export default class Container extends React.Component {
  static propTypes = {
    searchResult: ImmutablePropTypes.map,
    currentUser: ImmutablePropTypes.record,
    query: React.PropTypes.string,
    removeBundle: React.PropTypes.func,
    favorite: React.PropTypes.func,
    unfavorite: React.PropTypes.func
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

  renderListItem (searchResult, resourceName, component) {
    let props = this.props

    return searchResult.map((item, index) => (
      <ListItem
        key={index}
        currentUser={props.currentUser}
        resource={item}
        resourceName={resourceName}
        Component={component}
        remove={props['remove' + resourceName]}
        favorite={props.favorite}
        unfavorite={props.unfavorite}
        getBundle={props.getBundle}
        getCollection={props.getCollection}
        updateUI={props.updateUI}/>
    ))
  }

  renderList (searchResult, resourceName, component) {
    return (
      <List>
        <h4 className='name' style={shouldShow(searchResult.size > 0)}>
          {resourceName}s
        </h4>

        {this.renderListItem(searchResult, resourceName, component)}
      </List>
    )
  }

  renderResults () {
    const { searchResult } = this.props
    const bundles = searchResult.get('bundles')
    const collections = searchResult.get('collections')

    if (this.noResult(searchResult)) {
      return (<div className='search-note'>Search Bundles and Collections</div>)
    }

    return (
      <div className='search-results'>
        <h3 className='title'>Search results</h3>

        {this.renderList(bundles, 'Bundle', ListItem.Bundle)}
        {this.renderList(collections, 'Collection', ListItem.Collection)}
      </div>
    )
  }

  renderShareResource () {
    let props = this.props
    let { searchResult, ui } = props
    let resource = null
    let resourceName = null

    searchResult.get('bundles').forEach(item => {
      if (item.id == ui.resourceId) {
        resource = item
        resourceName = 'Bundle'
      }
    })

    searchResult.get('collections').forEach(item => {
      if (item.id == ui.resourceId) {
        resource = item
        resourceName = 'Collection'
      }
    })

    if (!resource || !ui.isOpen) return false

    return <ShareResource
      position={ui.position}
      resource={resource}
      resourceName={resourceName}
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

  render () {
    let props = this.props

    return (
      <ResourceNavigation>
        {this.renderShareResource()}

        <Search>
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
            <SearchBody>{this.renderResults()}</SearchBody>
          </ResourceNavigation.Body>
        </Search>
      </ResourceNavigation>
    )
  }
}
