import ImmutablePropTypes from 'react-immutable-proptypes'
import { SHARE_PERMISSIONS } from '../../../constants'
import './index.css'

export default class ShareItem extends React.Component {
  static propTypes = {
    share: ImmutablePropTypes.record,
    changeSharePermission: React.PropTypes.func
  }

  permissionChanged (e) {
    let permissionId = e.target.value
    let id = this.props.share.id
    let type = this.props.share.type

    this.props.changeSharePermission(id, type, permissionId)
  }

  renderPermission () {
    let selected = this.props.share.permission
    let options = SHARE_PERMISSIONS

    return (
      <select value={selected.get('id')} onChange={::this.permissionChanged}>
        {options.map(item => {
          return <option value={item.id} key={item.id}>{item.name}</option>
        })}
      </select>
    )
  }

  render () {
    let share = this.props.share

    return (
      <div className='share-list-item'>
        <div className='user-avatar'>
          <img src={share.user.image} />
        </div>

        <div className='user-information'>
          {share.user.name} / {share.user.email}
        </div>

        <div className='user-permission'>
          {::this.renderPermission()}
        </div>
      </div>
    )
  }
}
