import ImmutablePropTypes from 'react-immutable-proptypes'
import InviteUsers from './InviteUsers'
import ShareItem from './ShareItem'
import { Modal } from 'components'
import './index.css'

export default class ShareResource extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired,
    resourceName: React.PropTypes.string.isRequired,
    changeSharePermission: React.PropTypes.func.isRequired,
    removeShare: React.PropTypes.func.isRequired,
    position: React.PropTypes.object
  }

  renderShares () {
    const { resource, removeShare, changeSharePermission } = this.props

    return resource.shares.map(share =>
      <ShareItem
        key={share.id}
        share={share}
        resourceId={resource.id}
        changeSharePermission={changeSharePermission}
        removeShare={removeShare}/>
    )
  }

  render () {
    if (!this.props.ui.isOpen) return false

    return (
      <Modal style={this.props.position} className='share-resource-modal'>
        <InviteUsers
          {...this.props}
          resourceName={this.props.resourceName}
          resourceId={this.props.resource.id}/>

        {::this.renderShares()}
      </Modal>
    )
  }
}
