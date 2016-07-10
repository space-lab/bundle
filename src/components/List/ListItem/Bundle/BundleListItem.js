import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import { DateTime, ListToolbar } from 'components'

export default class BundleListItem extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired
  }

  renderCollectionName (name) {
    // TODO bad bad bad...
    if (!name) return false
    if (name && name.length > 25) name = name.slice(0, 25) + '...'

    return <span className='collection-name'>In {name}</span>
  }

  render () {
    let bundle = this.props.resource
    let url = this.props.url || `/bundle/${bundle.id}`

    return <div>
      <ListToolbar {...this.props} />

      <Link to={url} className='content'>
        <h1>{bundle.name || 'No name entered...'}</h1>
        <h2>
          Created <DateTime type='fromNow'>{bundle.created_at}</DateTime>
          {this.renderCollectionName(bundle.collection_name)}
        </h2>
      </Link>
    </div>
  }
}
