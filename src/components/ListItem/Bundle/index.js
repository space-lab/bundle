import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import { Date, ListToolbar } from 'components'
import './index.css'

export default class BundleListItem extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired
  }

  renderCollectionName (id) {
    if (!id) return null

    return (<span className='collection-name'>{id}</span>)
  }

  render () {
    const bundle = this.props.resource
    const url = this.props.url || `/bundle/${bundle.id}`

    return (
      <div>
        <ListToolbar {...this.props} />

        <Link to={url}>
          <h1>
            {bundle.name}
          </h1>
          <h2>
            Created <Date type='fromNow'>{bundle.created_at}</Date>
            {this.renderCollectionName(bundle.collection_id)}
          </h2>
        </Link>
      </div>
    )
  }
}
