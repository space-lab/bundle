import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import SearchHeader from './header'
import SearchBody from './body'

import * as searchActions from 'actions/Search'
import * as bundleActions from 'actions/Bundle'
import * as favoriteActions from 'actions/Favorite'

import './index.css'

const connectState = (state) => ({ searchResults: state.Search.get('result') })
const connectProps = {
  ...bundleActions,
  ...searchActions,
  ...favoriteActions
}

@connect(connectState, connectProps)
export default class SearchContainer extends React.Component {
  static propTypes = {
    searchResults: ImmutablePropTypes.map,
    query: React.PropTypes.string,
    removeBundle: React.PropTypes.func,
    favorite: React.PropTypes.func,
    unfavorite: React.PropTypes.func
  }

  componentWillMount () {
    let query = this.props.routeParams.query
    if (query) this.props.getSearchResult(query)
  }

  componentWillReceiveProps (nextProps) {
    let thisPropsQuery = this.props.routeParams.query
    let nextPropsQuery = nextProps.routeParams.query

    if (!nextPropsQuery) {
      nextProps.getSearchResult()
    } else if (thisPropsQuery !== nextPropsQuery && nextPropsQuery) {
      nextProps.getSearchResult(nextPropsQuery)
    }
  }

  render () {
    let {
      routeParams,
      favorite,
      unfavorite,
      removeBundle,
      searchResults
    } = this.props

    return (
      <div className='search-wrapper'>
        <SearchHeader query={routeParams.query} />

        <SearchBody
          removeBundle={removeBundle}
          favorite={favorite}
          unfavorite={unfavorite}
          searchResults={searchResults}
        />
      </div>
    )
  }
}
