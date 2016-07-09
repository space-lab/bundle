import ImmutablePropTypes from 'react-immutable-proptypes'
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
    let permissionId = e.target.value
    let id = this.props.share.id
    let type = this.props.share.type

    this.props.changeSharePermission(id, type, permissionId)
  }

  renderPermission () {
    let permission = this.props.share.permission.get('id')
    let options = SHARE_PERMISSIONS

    return (
      <select value={permission} onChange={::this.permissionChanged}>
        {options.map(item =>
          <option value={item.id} key={item.id}>{item.name}</option>
        )}
      </select>
    )
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

        <span className='icon close-icon'
          onClick={() => removeShare(share.id, share.type, resourceId)}/>
      </div>
    )
  }
}
