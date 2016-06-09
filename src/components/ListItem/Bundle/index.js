import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import { Date, ListToolbar } from 'components'

export default class BundleListItem extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired
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
          </h2>
        </Link>
      </div>
    )
  }
}
