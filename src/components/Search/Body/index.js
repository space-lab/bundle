import ImmutablePropTypes from 'react-immutable-proptypes'
import { List, ListItem } from 'components'
import { shouldShow } from 'helpers'
import './index.css'

export default class SearchBody extends React.Component {
  static propTypes = {
    searchResult: ImmutablePropTypes.map.isRequired,
    favorite: React.PropTypes.func.isRequired,
    removeBundle: React.PropTypes.func.isRequired,
    removeCollection: React.PropTypes.func.isRequired
  }

  noResult (search) {
    return !search.get('bundles').size && !search.get('collections').size
  }

  renderListItem (searchResult, resourceName, component) {
    return searchResult.map((item, index) => (
      <ListItem
        key={index}
        {...this.props}
        resource={item}
        resourceName={resourceName}
        Component={component}
        remove={this.props['remove' + resourceName]}
        favorite={this.props.favorite}
        unfavorite={this.props.unfavorite}/>
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

  render () {
    return (
      <div className='search-results-wrapper'>
        {this.renderResults()}
      </div>
    )
  }
}
