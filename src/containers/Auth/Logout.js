import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { UserActions } from 'actions'

const connectProps = { ...UserActions }

@connect(null, connectProps)
export default class Logout extends React.Component {
  componentWillMount () {
    this.props.logoutUser()
    browserHistory.push('/')
  }

  render () {
    return false
  }
}
