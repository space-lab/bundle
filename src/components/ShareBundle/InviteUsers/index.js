import ui from 'redux-ui'
import { SHARE_PERMISSIONS } from 'constants'
import { TagInput } from 'components'
import './index.css'

@ui({ state: { values: [], permission: 1 } })
export default class InviteUsers extends React.Component {
  static propTypes = {
    resourceId: React.PropTypes.string,
    resourceName: React.PropTypes.string,
    inviteUsers: React.PropTypes.func
  }

  inviteUsers () {
    const { values, permission } = this.props.ui
    const { inviteUsers, resetUI, resourceId, resourceName } = this.props
    const data = values.map(value => {
      return { id: value.id, permission_id: permission }
    })

    inviteUsers(resourceName, resourceId, { data })
      .then(() => resetUI())
  }

  handleValueChange (values) {
    this.props.updateUI('values', values)
  }

  permissionChanged (e) {
    this.props.updateUI('permission', e.target.value)
  }

  renderPermission () {
    const selected = this.props.ui.permission
    const options = SHARE_PERMISSIONS

    return (
      <select value={selected} onChange={::this.permissionChanged}>
        {options.map(item => {
          return <option value={item.id} key={item.id}>{item.name}</option>
        })}
      </select>
    )
  }

  render () {
    return (
      <div className='invite-users-container'>
        <div className='full-row'>
          <TagInput
            data={this.props.userAutocomplete}
            getData={this.props.getAutocompleteUsers}
            resetData={this.props.resetAutocompleteUsers}
            handleChange={::this.handleValueChange}
          />
        </div>

        <div className='full-row members'>
          <span>Members can</span>

          {::this.renderPermission()}

          <button
            className='button'
            onClick={::this.inviteUsers}>
            Invite
         </button>
        </div>
      </div>
    )
  }
}
