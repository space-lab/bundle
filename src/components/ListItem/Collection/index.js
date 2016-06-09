import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import { ListToolbar, Editable } from 'components'

function sharedWithText (count) {
  if (count || count === 0) {
    return `· Shared with ${count} people`
  } else {
    return ''
  }
}

export default function CollectionListItem (props) {
  const { resource, createCollection } = props
  const url = props.url || `/collection/${resource.id}`

  return (
    <div>
      <ListToolbar {...props} />

      <Link to={url} onClick={event => resource.editMode && event.preventDefault()}>
        <div>
          <h1>
            <Editable
              value={resource.name}
              placeholder='Name Collection...'
              editMode={resource.editMode}
              autoFocus={true}
              enterAction={value => createCollection(resource.id, value)}
            />
          </h1>
          <h2>
            <span>{resource.bundles_count} Bundle</span>
            <span>{sharedWithText(resource.shares_count)}</span>
          </h2>
        </div>
      </Link>
    </div>
  )
}

CollectionListItem.propTypes = {
  resource: ImmutablePropTypes.record.isRequired,
  url: React.PropTypes.string,
  createCollection: React.PropTypes.func.isRequired
}
