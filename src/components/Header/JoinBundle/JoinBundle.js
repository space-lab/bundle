import ImmutablePropTypes from 'react-immutable-proptypes'

export default class JoinBundle extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record.isRequired,
    currentUserId: React.PropTypes.number.isRequired,
    joinUrlShare: React.PropTypes.func.isRequired,
    addAlert: React.PropTypes.func.isRequired
  }

  join () {
    let { bundle, joinUrlShare, addAlert } = this.props

    joinUrlShare('bundle', bundle.id).then(() =>
      addAlert('success', 'Hurray!!!, You\'ve successfully joined bundle!'))
  }

  render () {
    if (this.props.bundle.joined) return false

    return <button className='round-button' onClick={::this.join}>
      Join
    </button>
  }
}
