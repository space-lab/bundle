import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { UserSelectors, SearchSelectors } from 'selectors'
import { Search, ShareResource } from 'components'
import { BundleActions, CollectionActions, FavoriteActions, SearchActions,
  ShareActions, UserActions } from 'actions'
import './index.css'

let connectState = (state) => ({
  currentUser: UserSelectors.current(state),
  userAutocomplete: UserSelectors.autocompletes(state),
  searchResult: SearchSelectors.currentResult(state)
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
export default class SearchContainer extends React.Component {
  static propTypes = {
    searchResult: ImmutablePropTypes.map,
    currentUser: ImmutablePropTypes.record,
    query: React.PropTypes.string,
    removeBundle: React.PropTypes.func,
    favorite: React.PropTypes.func,
    unfavorite: React.PropTypes.func
  }

  componentWillMount () {
    const { query } = this.props.routeParams
    if (query) this.props.getSearchResult(query)
  }

  componentWillReceiveProps (nextProps) {
    const thisPropsQuery = this.props.routeParams.query
    const nextPropsQuery = nextProps.routeParams.query

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
    const { query } = this.props.routeParams

    return (
      <div className='search-wrapper'>
        {this.renderShareResource()}

        <Search.Header query={query}/>
        <Search.Body {...this.props}/>
      </div>
    )
  }
}
