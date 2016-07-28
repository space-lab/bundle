import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import { SHARE_PERMISSIONS } from 'constants'
import { TagInput, UrlShare } from 'components'
import './InviteUsers.css'

@ui({ state: { values: [], permission: 1 } })
export default class InviteUsers extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired,
    resourceId: React.PropTypes.string,
    resourceName: React.PropTypes.string,
    inviteUsers: React.PropTypes.func,
    userAutocomplete: ImmutablePropTypes.list,
    getAutocompleteUsers: React.PropTypes.func,
    resetAutocompleteUsers: React.PropTypes.func,
    getShareUrl: React.PropTypes.func.isRequired,
    changeUrlPermission: React.PropTypes.func.isRequired,
    removeUrlShare: React.PropTypes.func.isRequired
  }

  inviteUsers () {
    let { ui, resetUI, inviteUsers, resourceId, resourceName } = this.props
    let data = ui.values.map(value =>
      ({ id: value.id, permission_id: ui.permission }))

    inviteUsers(resourceName, resourceId, { data })
      .then(() => { resetUI() && this.props.resetAutocompleteUsers() })
  }

  handleValueChange (values) {
    this.props.updateUI('values', values)
  }

  handleMemberPermissionChange ({ target }) {
    this.props.updateUI('permission', target.value)
  }

  renderMemberPermissions () {
    let selected = this.props.ui.permission
    let options = SHARE_PERMISSIONS

    return (
      <select value={selected} onChange={::this.handleMemberPermissionChange}>
        {options.map(option =>
          <option key={option.id} value={option.id}>{option.name}</option>
        )}
      </select>
    )
  }

  renderUrlShare () {
    if (this.props.resourceName === 'Collection') return false

    return <div className='full-row'>
      <UrlShare
        getShareUrl={this.props.getShareUrl}
        changeUrlPermission={this.props.changeUrlPermission}
        removeUrlShare={this.props.removeUrlShare}
        resourceName={this.props.resourceName}
        resource={this.props.resource}/>
    </div>
  }

  render () {
    return <div className='invite-users-container'>
      <div className='full-row invite'>
        <TagInput
          data={this.props.userAutocomplete}
          resource={this.props.resource}
          getData={this.props.getAutocompleteUsers}
          resetData={this.props.resetAutocompleteUsers}
          handleChange={::this.handleValueChange}/>
      </div>

      <div className='full-row members'>
        <span>Members can</span>

        {::this.renderMemberPermissions()}

        <button className='main-button' onClick={::this.inviteUsers}>
          Invite
        </button>
      </div>

      {::this.renderUrlShare()}
    </div>
  }
}
