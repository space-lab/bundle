import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import { ListToolbar, Editable } from 'components'

export default class CollectionListItem extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired,
    url: React.PropTypes.string,
    createCollection: React.PropTypes.func.isRequired
  }

  sharedWithText (count) {
    return (count || count === 0)
      ? `· Shared with ${count} people`
      : ''
  }

  render () {
    const { resource, createCollection, url } = this.props
    const link = url || `/collection/${resource.id}`

    return (
      <div>
        <ListToolbar {...this.props} />

        <Link to={url} onClick={event => resource.editMode && event.preventDefault()}>
          <div>
            <h1>
              <Editable
                value={resource.name}
                placeholder='Name Collection...'
                editMode={resource.editMode}
                autoFocus={true}
                enterAction={value => createCollection(resource.id, value)}/>
            </h1>

            <h2>
              <span>{resource.bundles_count} Bundle </span>
              <span>{this.sharedWithText(resource.shares_count)}</span>
            </h2>
          </div>
        </Link>
      </div>
    )
  }
}
