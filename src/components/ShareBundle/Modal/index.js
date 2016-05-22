import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import InviteUsers from '../InviteUsers'
import ShareItem from '../ShareItem'
import { Modal } from './../../'
import './index.css'

export default class ShareBundleModal extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record,
    changeSharePermission: React.PropTypes.func,
    inviteUsers: React.PropTypes.func
  }

  renderShares () {
    let shares = this.props.bundle.shares

    return shares.map(share => {
      return <ShareItem key={share.id} share={share}
        changeSharePermission={this.props.changeSharePermission}
      />
    })
  }

  render () {
    if (!this.props.ui.isOpen) return false

    return (
      <Modal className='share-bundle-modal'>
        <InviteUsers
          resourceName='Bundle'
          resourceId={this.props.bundle.id}
          inviteUsers={this.props.inviteUsers}
        />

        {::this.renderShares()}
      </Modal>
    )
  }
}
