import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { SHARE_PERMISSIONS } from 'constants'
import { TagInput } from 'components'
import './index.css'

@ui({ state: { values: [], permission: 1 } })
export default class InviteUsers extends React.Component {
  static propTypes = {
    resourceId: React.PropTypes.string,
    resourceName: React.PropTypes.string,
    inviteUsers: React.PropTypes.func,
    userAutocomplete: ImmutablePropTypes.list,
    getAutocompleteUsers: React.PropTypes.func,
    resetAutocompleteUsers: React.PropTypes.func
  }

  inviteUsers () {

    const { ui, resetUI, inviteUsers, resourceId, resourceName } = this.props
    const data = ui.values.map(value =>
      ({ id: value.id, permission_id: ui.permission }))

    inviteUsers(resourceName, resourceId, { data })
      .then(() => {
        resetUI()
        this.props.resetAutocompleteUsers()
      })
  }

  handleValueChange (values) {
    this.props.updateUI('values', values)
  }

  handlePermissionChange ({ target }) {
    this.props.updateUI('permission', target.value)
  }

  renderPermission () {
    const selected = this.props.ui.permission
    const options = SHARE_PERMISSIONS

    return (
      <select value={selected} onChange={::this.handlePermissionChange}>
        {options.map(item =>
          <option value={item.id} key={item.id}>{item.name}</option>
        )}
      </select>
    )
  }

  render () {
    return (
      <div className='invite-users-container'>
        <div className='full-row'>
          <TagInput
            data={this.props.userAutocomplete}
            resource={this.props.resource}
            getData={this.props.getAutocompleteUsers}
            resetData={this.props.resetAutocompleteUsers}
            handleChange={::this.handleValueChange}
          />
        </div>

        <div className='full-row members'>
          <span>Members can</span>

          {::this.renderPermission()}

          <button className='round-button' onClick={::this.inviteUsers}>
            Invite
          </button>
        </div>
      </div>
    )
  }
}
