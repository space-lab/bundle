import listensToClickOutside from 'react-onclickoutside'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { InviteUsers, ShareItem, Modal } from 'components'
import './ShareResource.css'

let enhancer = listensToClickOutside

class ShareResource extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record,
    resourceName: React.PropTypes.string.isRequired,
    changeSharePermission: React.PropTypes.func.isRequired,
    removeShare: React.PropTypes.func.isRequired,
    shareModal: React.PropTypes.object.isRequired,
    updateShareModal: React.PropTypes.func.isRequired
  }

  handleClickOutside (e) {
    if (this.props.shareModal.isOpen) {
      this.props.updateShareModal({ isOpen: false, position: null })
    }
  }

  renderShares () {
    const { resource, removeShare, changeSharePermission } = this.props

    return resource.shares.map(share =>
      <ShareItem
        key={share.id}
        share={share}
        resourceId={resource.id}
        changeSharePermission={changeSharePermission}
        removeShare={removeShare}/>)
  }

  render () {
    return <Modal style={this.props.shareModal.position} className='share-resource-modal'>
      <InviteUsers
        {...this.props}
        resourceName={this.props.resourceName}
        resourceId={this.props.resource.id}/>

      {::this.renderShares()}
    </Modal>
  }
}

export default enhancer(ShareResource)
