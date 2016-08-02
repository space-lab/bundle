import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { UserActions } from 'actions'

let connectProps = { ...UserActions }

let enhancer = connect(null, connectProps)

class Logout extends React.Component {
  componentWillMount () {
    this.props.logoutUser()
    browserHistory.push('/')
  }

  render () {
    return false
  }
}

export default enhancer(Logout)
