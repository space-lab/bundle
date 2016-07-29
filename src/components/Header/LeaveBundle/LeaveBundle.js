import { browserHistory } from 'react-router'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default class LeaveBundle extends React.Component {
  static propTypes = {
    bundleId: React.PropTypes.string.isRequired,
    shareId: React.PropTypes.number,
    leaveShare: React.PropTypes.func.isRequired,
    addAlert: React.PropTypes.func.isRequired
  }

  leave () {
    let { bundleId, shareId, leaveShare, addAlert } = this.props

    leaveShare(shareId, bundleId).then(() => {
      browserHistory.push('/')
      addAlert('success', 'You\'ve just left bundle 😢')
    })
  }

  render () {
    if (!this.props.shareId) return false

    return <button className='main-button' onClick={::this.leave}>
      Leave
    </button>
  }
}
