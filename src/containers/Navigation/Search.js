import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { UserSelectors, SearchSelectors } from 'selectors'
import { Search, ShareResource, ResourceNavigation } from 'components'
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
    return (
      <ResourceNavigation>
        {this.renderShareResource()}

        <ResourceNavigation.Header>
          <Search.Header query={this.props.query}/>
        </ResourceNavigation.Header>

        <ResourceNavigation.Body>
          <Search.Body {...this.props}/>
        </ResourceNavigation.Body>
      </ResourceNavigation>
    )
  }
}
