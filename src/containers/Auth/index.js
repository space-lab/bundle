import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import Login from './Login'
import Email from './Email'
import { currentUserSelector } from 'selectors'
import * as userActions from 'actions/User'
import './index.css'

const connectState = (state) => ({
  currentUser: state.User.getIn(['byId', state.User.get('current')])
})

const connectProps = {
  ...userActions
}

@connect(connectState, connectProps)
export default class Auth extends React.Component {
  componentWillMount () {
    let {currentUser, setCurrentUser, authenticateUser } = this.props
    let { query } = this.props.location
    let auth_token = localStorage.getItem('auth_token')

    if (query.authenticated === "true") {
      let user = JSON.parse(query.user)
      setCurrentUser(user)

      browserHistory.push('/')
    } else if (auth_token && !currentUser) {
      authenticateUser(auth_token)
    }
  }

  getAuthToken () {
    return localStorage.getItem('auth_token')
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
    let { children, currentUser } = this.props

    if (this.shouldNotRender()) {
      // TODO: loading screen...
      return false
    } else if (this.shouldRenderLogin()) {
      return <Login />
    } else if (this.shouldRenderEmail()) {
      return <Email user={currentUser} />
    } else {
      return children
    }
  }
}
