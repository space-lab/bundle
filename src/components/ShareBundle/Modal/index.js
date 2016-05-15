import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import Share  from '../Share'
import './index.css'

export default class ShareBundleModal extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record,
    changeSharePermission: React.PropTypes.func
  }

  renderShares () {
    let shares = this.props.bundle.shares

    return shares.map(share => {
      return <Share key={share.id} share={share}
        changeSharePermission={this.props.changeSharePermission}
      />
    })
  }

  render () {
    if (!this.props.ui.isOpen) return false

    return (
      <div className='change-collection-modal'>
      {::this.renderShares()}
      </div>
    )
  }
}
