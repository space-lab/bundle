import { browserHistory } from 'react-router'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default class LeaveResource extends React.Component {
  static propTypes = {
    resourceId: React.PropTypes.string.isRequired,
    bundleName: React.PropTypes.string,
    shareId: React.PropTypes.number,
    leaveShare: React.PropTypes.func.isRequired,
    addAlert: React.PropTypes.func.isRequired
  }

  leave () {
    let { resourceId, resourceName, shareId, leaveShare, addAlert } = this.props

    leaveShare(shareId, resourceId, resourceName).then(() => {
      browserHistory.push('/')
      addAlert('success', `You\'ve just left ${resourceName} 😢`)
    })
  }

  render () {
    if (!this.props.shareId) return false

    return <button className='main-button' onClick={::this.leave}>
      {`Leave ${this.props.resourceName}` }
    </button>
  }
}
