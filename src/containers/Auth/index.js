import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import Login from './Login'
import Email from './Email'
import Selectors from 'selectors'
import * as userActions from 'actions/User'
import './index.css'

const connectState = (state) => ({
  currentUser: Selectors.currentUser(state),
  routing: state.routing
})

const connectProps = {
  ...userActions
}

@connect(connectState, connectProps)
export default class Auth extends React.Component {
  componentWillMount () {
    const {currentUser, setCurrentUser, authenticateUser } = this.props
    const { query } = this.props.location
    const auth_token = window.localStorage.getItem('auth_token')

    if (query.authenticated === "true") {
      const user = JSON.parse(query.user)
      setCurrentUser(user)

      browserHistory.push('/')
    } else if (auth_token && !currentUser) {
      authenticateUser(auth_token)
    }
  }

  getAuthToken () {
    return window.localStorage.getItem('auth_token')
  }

  shouldNotRender () {
    return !this.props.currentUser && this.getAuthToken()
  }

  shouldRenderLogin () {
    return !this.props.currentUser || !this.getAuthToken()
  }

  shouldRenderEmail () {
    return this.props.currentUser && !this.props.currentUser.email
  }

  render () {
    const { children, currentUser, updateUser } = this.props

    if (this.shouldNotRender()) {
      // TODO: loading screen...
      return false
    } else if (this.shouldRenderLogin()) {
      return <Login />
    } else if (this.shouldRenderEmail()) {
      return <Email user={currentUser} updateUser={updateUser} />
    } else {
      return children
    }
  }
}
