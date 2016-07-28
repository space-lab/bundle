import { browserHistory } from 'react-router'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default class LeaveBundle extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record.isRequired,
    currentUserId: React.PropTypes.number.isRequired,
    leaveShare: React.PropTypes.func.isRequired,
    addAlert: React.PropTypes.func.isRequired
  }

  leave () {
    let { bundle, currentUserId, leaveShare, addAlert } = this.props
    let share = bundle.shares.find(share => share.user.id === currentUserId)

    leaveShare(share.id, bundle.id).then(() => {
      browserHistory.push('/')
      addAlert('success', 'You\'ve just left bundle 😢')
    })
  }

  render () {
    return <button className='main-button' onClick={::this.leave}>
      Leave
    </button>
  }
}
