import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import { ListToolbar, Editable } from 'components'

export default class CollectionListItem extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired,
    url: React.PropTypes.string,
    createCollection: React.PropTypes.func
  }

  sharedWithText (count) {
    return count ? `· Shared with ${count} people` : ''
  }

  render () {
    let { resource, createCollection, url } = this.props
    let link = url || `/collection/${resource.slug}-${resource.id}`

    return <div>
      <ListToolbar {...this.props} />

      <Link
        to={link}
        className='content'
        onClick={event => resource.editMode && event.preventDefault()}>
        <div>
          <h1>
            <Editable
              value={resource.name}
              placeholder='Name Collection...'
              editMode={resource.editMode}
              autoFocus
              enterAction={value => createCollection(resource.id, value)} />
          </h1>

          <h2>
            <span>{resource.bundles_count} Bundle </span>
            <span>{this.sharedWithText(resource.shares_count)}</span>
          </h2>
        </div>
      </Link>
    </div>
  }
}
