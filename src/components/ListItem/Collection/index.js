import { Link } from 'react-router'
import { ListToolbar, Editable } from 'components'

function sharedWithText (count) {
  if (count || count === 0) {
    return `· Shared with ${count} people`
  } else {
    return ''
  }
}

export default function CollectionListItem ({
  id,
  name,
  created_at,
  bundles_count,
  shares_count,
  editMode,
  createCollection,
  ...toolbarProps
}) {
  let url = '/collection/' + id

  return (
    <div>
      <ListToolbar id={id} editMode={editMode} {...toolbarProps} />

      <Link to={url} onClick={event => editMode && event.preventDefault()}>
        <div>
          <h1>
            <Editable
              value={name}
              placeholder='Name Collection...'
              editMode={editMode}
              focus={true}
              enterAction={value => createCollection(id, value)}
            />
          </h1>
          <h2>
            <span>{bundles_count} Bundle</span>
            <span>{sharedWithText(shares_count)}</span>
          </h2>
        </div>
      </Link>
    </div>
  )
}

CollectionListItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  created_at: React.PropTypes.string.isRequired,
  bundles_count: React.PropTypes.number.isRequired,
  shares_count: React.PropTypes.number.isRequired,
  createCollection: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
  editMode: React.PropTypes.bool
}
