import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { Search, ShareResource } from 'components'
import * as searchActions from 'actions/Search'
import * as bundleActions from 'actions/Bundle'
import * as collectionActions from 'actions/Collection'
import * as favoriteActions from 'actions/Favorite'
import * as shareActions from 'actions/Share'
import * as userAutocompleteActions from 'actions/UserAutocomplete'
import Selectors from 'selectors'
import './index.css'

const connectState = (state) => ({
  searchResult: Selectors.currentSearchResult(state),
  userAutocomplete: state.UserAutocomplete
})

const connectProps = {
  ...bundleActions,
  ...collectionActions,
  ...searchActions,
  ...favoriteActions,
  ...shareActions,
  ...userAutocompleteActions
}

@ui({
  key: 'resource-navigation',
  state: { isOpen: false, position: null, resourceId: null }
})
@connect(connectState, connectProps)
export default class SearchContainer extends React.Component {
  static propTypes = {
    searchResult: ImmutablePropTypes.map,
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

  findShareResource () {

  }

  renderShareResource () {
    let { searchResult, ui } = this.props
    let bundles = searchResult.get('bundles')
    let collections = searchResult.get('collections')
    let resource = null
    let resourceName = null

    bundles.forEach(item => {
      if (item.id == ui.resourceId) {
        resource = item
        resourceName = 'Bundle'
      }
    })

    collections.forEach(item => {
      if (item.id == ui.resourceId) {
        resource = item
        resourceName = 'Collection'
      }
    })

    if (!resource || !resource.full_response) return false

    return <ShareResource
        {...this.props}
        position={ui.position}
        resource={resource}
        resourceName={resourceName}/>
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
