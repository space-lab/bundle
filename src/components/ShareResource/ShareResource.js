import listensToClickOutside from 'react-onclickoutside'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, withState } from 'recompose'
import { SHARE_PERMISSIONS } from 'constants'
import { ShareItem, Modal, TagInput, UrlShare, Permission } from 'components'
import { List, fromJS } from 'immutable'
import './ShareResource.css'

let enhancer = compose(
  withState('users', 'updateUsers', List()),
  withState('permission', 'updatePermission', 1),
  listensToClickOutside
)

class ShareResource extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record,
    resourceId: React.PropTypes.string,
    resourceName: React.PropTypes.string.isRequired,
    inviteUsers: React.PropTypes.func,
    userAutocomplete: ImmutablePropTypes.list,
    getAutocompleteUsers: React.PropTypes.func,
    resetAutocompleteUsers: React.PropTypes.func,
    changeSharePermission: React.PropTypes.func.isRequired,
    removeShare: React.PropTypes.func.isRequired,
    changeUrlPermission: React.PropTypes.func.isRequired,
    users: ImmutablePropTypes.list.isRequired,
    updateUsers: React.PropTypes.func.isRequired,
    permission: React.PropTypes.number.isRequired,
    updatePermission: React.PropTypes.func.isRequired,
    shareModal: React.PropTypes.object.isRequired,
    updateShareModal: React.PropTypes.func.isRequired
  }

  handleClickOutside (e) {
    if (this.props.shareModal.isOpen) {
      this.props.updateShareModal({ isOpen: false, position: null })
    }
  }

  inviteUsers () {
    let { permission, users, inviteUsers, resourceId, resourceName } = this.props
    let data = users.map(user => ({ id: user.id, permission_id: permission }))

    inviteUsers(resourceName, resourceId, { data })
      .then(() => {
        this.props.resetAutocompleteUsers()
        this.props.updateUsers(List())
      })
  }

  handleValueChange (values) {
    this.props.updateUsers(values)
  }

  handleMemberPermissionChange ({ target }) {
    this.props.updatePermission(+target.value)
  }

  render () {
    let props = this.props

    return <Modal
      style={props.shareModal.position}
      className='share-resource-modal'>
      <div className='invite-users-container'>
        <Permission allow={props.resourceName !== 'Collection'}>
          <div>
            <div className='row-heading'>Share with others</div>
            <div className='full-row'>
              <UrlShare
                changeUrlPermission={props.changeUrlPermission}
                resourceName={props.resourceName}
                resource={props.resource}/>
            </div>
          </div>
        </Permission>

        <div className='row-heading'>Who has access</div>
        <div className='full-row invite'>
          <TagInput
            tags={props.users}
            updateTags={props.updateUsers}
            data={props.userAutocomplete}
            resource={props.resource}
            getData={props.getAutocompleteUsers}
            resetData={props.resetAutocompleteUsers}
            handleChange={::this.handleValueChange}/>
        </div>

        <div className='full-row members'>
          <span>Members</span>

          <select
            className='own-select-dropdown'
            value={props.permission}
            onChange={::this.handleMemberPermissionChange}>
            {SHARE_PERMISSIONS.map(permission=>
              <option key={permission.id} value={permission.id}>
                {`Can ${permission.name.toLowerCase()}`}
              </option>
            )}
          </select>

          <button className='main-button' onClick={::this.inviteUsers}>
            Invite
          </button>
        </div>
      </div>

      { props.resource.shares.map(share =>
          <ShareItem
            key={share.id}
            share={share}
            resourceId={props.resource.id}
            changeSharePermission={props.changeSharePermission}
            removeShare={props.removeShare} />)
      }
    </Modal>
  }
}

export default enhancer(ShareResource)
