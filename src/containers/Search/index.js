import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import SearchHeader from './header'
import SearchBody from './body'
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

  render () {
    const { query } = this.props.routeParams

    return (
      <div className='search-wrapper'>
        <SearchHeader query={query}/>
        <SearchBody {...this.props}/>
      </div>
    )
  }
}
