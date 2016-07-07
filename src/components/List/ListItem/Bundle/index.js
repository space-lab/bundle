import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import { DateTime, ListToolbar } from 'components'
import './index.css'

export default class BundleListItem extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired
  }

  renderCollectionName (id) {
    if (id && id.length > 25) id = id.slice(0, 25) + '...'

    return id ? <span className='collection-name'>{id}</span> : null
  }

  render () {
    const bundle = this.props.resource
    const url = this.props.url || `/bundle/${bundle.id}`

    return (
      <div className='list-item-collection'>
        <ListToolbar {...this.props} />

        <Link to={url}>
          <h1>
            {bundle.name}
          </h1>

          <h2>
            Created <DateTime type='fromNow'>{bundle.created_at}</DateTime>
            {this.renderCollectionName(bundle.collection_id)}
          </h2>
        </Link>
      </div>
    )
  }
}
