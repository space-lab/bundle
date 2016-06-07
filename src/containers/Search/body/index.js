import ImmutablePropTypes from 'react-immutable-proptypes'
import { List, ListItem } from 'components'
import './index.css'

function isAnyResult (search) {
  return search.get('bundles').size || search.get('collections').size
}

function shouldShow (show) {
  return { 'display': show ? 'block' : 'none' }
}

function renderList (searchResult, listType, component, props) {
  let { removeBundle, favorite, unfavorite } = props

  return searchResult.map((item, index) => {
    let resourceName = (listType == 'bundles') ? 'Bundle' : 'Collection'

    return <ListItem key={index}
       {...props}
       resource={item}
       resourceName={resourceName}
       Component={component}
       remove={removeBundle}
       favorite={favorite}
       unfavorite={unfavorite}
     />
  })
}

function renderResults (props) {
  let searchResult = props.searchResult
  let bundles = searchResult.get('bundles')
  let collections = searchResult.get('collections')

  if (!isAnyResult(searchResult)) {
    return <div className='search-note'>Search Bundles and Collections</div>
  }

  return (
    <div className='search-results'>
      <h3 className='title'>Search results</h3>

      <List>
        <h4 className='name' style={shouldShow(collections.size > 0)}>
          Collections
        </h4>

        {renderList(collections, 'collections', ListItem.Collection, props)}
      </List>

      <List>
        <h4 style={shouldShow(bundles.size > 0)}
          className='name'> Bundles
        </h4>

        {renderList(bundles, 'bundles', ListItem.Bundle, props)}
      </List>

    </div>
  )
}

export default function SearchBody (props) {
  return (
    <div className='search-results-wrapper'>
      {renderResults(props)}
    </div>
  )
}

SearchBody.propTypes = {
  searchResult: ImmutablePropTypes.map,
  removeBundle: React.PropTypes.func,
  favorite: React.PropTypes.func,
  unfavorite: React.PropTypes.func
}
