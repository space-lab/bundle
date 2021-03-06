import ImmutablePropTypes from 'react-immutable-proptypes'
import { Select } from 'components'
import { SHARE_PERMISSIONS } from 'constants'
import './ShareItem.css'

export default class ShareItem extends React.Component {
  static propTypes = {
    share: ImmutablePropTypes.record.isRequired,
    resourceId: React.PropTypes.string.isRequired,
    changeSharePermission: React.PropTypes.func.isRequired,
    removeShare: React.PropTypes.func.isRequired
  }

  permissionChanged (e) {
    let { id, type } = this.props.share
    let permissionId = e.target.value
    let resourceId = this.props.resourceId

    permissionId == 3
      ? this.props.removeShare(id, type, resourceId)
      : this.props.changeSharePermission(id, type, permissionId)
  }

  renderPermission () {
    let permission = this.props.share.permission.get('id')
    let options = SHARE_PERMISSIONS
      .map(item => ({ id: item.id, name: `Can ${item.name.toLowerCase()}`}))
      .concat({ id: 3, name: 'Remove'})

    return <Select value={permission} options={options} onChange={::this.permissionChanged} />
  }

  render () {
    let { share, resourceId, removeShare } = this.props

    return (
      <div className='share-list-item'>
        <div className='user-avatar'>
          <img src={share.user.image} />
        </div>

        <div className='user-information'>
          <div className='name'>{share.user.name}</div>
          <div className='email'>{share.user.email}</div>
        </div>

        <div className='user-permission'>
          {::this.renderPermission()}
        </div>
      </div>
    )
  }
}
