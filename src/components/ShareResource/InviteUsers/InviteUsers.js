import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, withState } from 'recompose'
import { SHARE_PERMISSIONS } from 'constants'
import { TagInput, UrlShare } from 'components'
import './InviteUsers.css'

let enhancer = compose(
  withState('users', 'updateUsers', []),
  withState('permission', 'updatePermission', 1)
)

class InviteUsers extends React.Component {
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
    removeUrlShare: React.PropTypes.func.isRequired,
    users: React.PropTypes.array.isRequired,
    updateUsers: React.PropTypes.func.isRequired,
    permission: React.PropTypes.number.isRequired,
    updatePermission: React.PropTypes.func.isRequired
  }

  inviteUsers () {
    let { permission, users, inviteUsers, resourceId, resourceName } = this.props
    let data = users.map(user=>
      ({ id: user.id, permission_id: permission }))

    inviteUsers(resourceName, resourceId, { data })
      .then(() => { this.props.resetAutocompleteUsers() })
  }

  handleValueChange (values) {
    this.props.updateUsers(values)
  }

  handleMemberPermissionChange ({ target }) {
    this.props.updatePermission(target.value)
  }

  renderMemberPermissions () {
    let selected = this.props.permission
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
export default enhancer(InviteUsers)
