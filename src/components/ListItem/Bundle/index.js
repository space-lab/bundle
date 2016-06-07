import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import { Date, ListToolbar } from 'components'

export default function BundleListItem (props) {
  let bundle = props.resource
  let url = props.url || `/bundle/${bundle.id}`

  return (
    <div>
      <ListToolbar {...props} />

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

BundleListItem.propTypes = {
  resource: ImmutablePropTypes.record.isRequired
}
