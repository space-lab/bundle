import { Link } from 'react-router'
import { List, ListItem, ResourceNavigation } from 'components'

export default function Wrapper ({
  collections,
  generateNewCollection,
  createCollection,
  removeCollection,
  closeCollection,
  ...listItemProps
}) {
  let collectionsList = collections.map((collection, index) => {
    return <ListItem key={index}
      {...collection.toJS()}
      {...listItemProps}
      Component={ListItem.Collection}
      type={'collection'}
      remove={removeCollection}
      close={closeCollection}
      createCollection={createCollection}
    />
  })

  return (
    <ResourceNavigation>
      <div className='bundles-navigation'>
        <ResourceNavigation.Header>
          <h2 className='title'>Collections</h2>
          <div className='nav'>
            <span className='icon create-collection-icon' onClick={generateNewCollection}></span>
            <Link to='/search' className='icon search-icon' />
          </div>
        </ResourceNavigation.Header>

        <ResourceNavigation.Body>
          <List>
            {collectionsList}
          </List>
        </ResourceNavigation.Body>
      </div>
    </ResourceNavigation>
  )
}
