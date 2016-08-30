import Cookie from 'js-cookie'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import Login from './Login'
import Email from './Email'
import { UserSelectors } from 'selectors'
import { UserActions } from 'actions'
import './index.css'

let connectState = state => ({
  currentUser: UserSelectors.current(state),
  routing: state.routing
})

let connectProps = {
  ...UserActions
}

let enhancer = connect(connectState, connectProps)

class Auth extends React.Component {
  componentWillMount () {
    const { currentUser, setCurrentUser, authenticateUser } = this.props
    const { query } = this.props.location
    const authToken = Cookie.get('auth_token')

    if (query.authenticated === 'true') {
      const user = JSON.parse(query.user)
      setCurrentUser(user)

      browserHistory.push('/')
    } else if (authToken && !currentUser) {
      authenticateUser(authToken)
    }
  }

  getAuthToken () {
    return Cookie.get('auth_token')
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
export default enhancer(Auth)
