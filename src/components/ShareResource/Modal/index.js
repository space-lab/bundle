import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import InviteUsers from '../InviteUsers'
import ShareItem from '../ShareItem'
import { Modal } from 'components'
import './index.css'

export default class ShareResourceModal extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record,
    resourceName: React.PropTypes.string,
    changeSharePermission: React.PropTypes.func,
  }

  renderShares () {
    let shares = this.props.resource.shares

    return shares.map(share => {
      return <ShareItem key={share.id} share={share}
        changeSharePermission={this.props.changeSharePermission}
      />
    })
  }

  render () {
    if (!this.props.ui.isOpen) return false

    return (
      <Modal style={this.props.position} className='share-resource-modal'>
        <InviteUsers
          {...this.props}
          resourceName={this.props.resourceName}
          resourceId={this.props.resource.id}
        />

        {::this.renderShares()}
      </Modal>
    )
  }
}
