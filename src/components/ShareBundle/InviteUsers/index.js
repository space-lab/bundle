import ui from 'redux-ui'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { SHARE_PERMISSIONS } from '../../../constants'
import './index.css'

@ui({
  state: { value: '', permission: 1 }
})
export default class InviteUsers extends React.Component {
  static propTypes = {
    resourceId: React.PropTypes.string,
    resourceName: React.PropTypes.string,
    inviteUsers: React.PropTypes.func
  }

  handleKeyUp ({ target }) {
    this.props.updateUI('value', target.value)
  }

  inviteUsers () {
    let permission = this.props.ui.permission
    let id = this.props.resourceId
    let resource = this.props.resourceName

    let data = this.props.ui.value.split(',').map(email => {
      return { email: email.trim(), permission_id: permission }
    })

    this.props.inviteUsers(resource, id, { data }).then(()=> {
      this.props.resetUI()
    })
  }

  permissionChanged (e) {
    this.props.updateUI('permission', e.target.value)
  }

  renderPermission () {
    let selected = this.props.ui.permission
    let options = SHARE_PERMISSIONS

    return (
      <select value={selected} onChange={::this.permissionChanged}>
        {options.map(item => {
          return <option value={item.id} key={item.id}>{item.name}</option>
        })}
      </select>
    )
  }

  render () {
    let value = this.props.ui.value

    return (
      <div className='invite-users-container'>
        <div className='invite-input-container'>
          <textarea defaultValue={value || ''}
            placeholder='Enter name, or email'
            onKeyUp={::this.handleKeyUp}
          />
        </div>

        <div className='invite-button-container'>
          <span>Members</span>
          {::this.renderPermission()}
          <button onClick={::this.inviteUsers}>Invite</button>
        </div>
      </div>
    )
  }
}
