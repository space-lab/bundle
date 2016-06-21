import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { Auth, App, Bundle } from 'containers'
import Selectors from 'selectors'
import * as userActions from 'actions/User'
import * as shareActions from 'actions/Share'

const connectState = state => ({
  user: Selectors.currentUser(state)
})

const connectProps = {
  ...shareActions,
  ...userActions
}

@connect(connectState, connectProps)
export default class ShareContainer extends React.Component {
  componentWillMount () {
    let { params, user, authenticateUser, getResource } = this.props
    let auth_token = localStorage.getItem('auth_token')

    if (!user && auth_token) authenticateUser(auth_token)

    getResource(params.resource, params.id, params.token)
  }

  componentWillReceiveProps (props) {
    let { user, params, history } = props

    if (user) {
      return browserHistory.push(`/${params.resource}/${params.id}`)
    }
  }

  render () {
    let { user, params, location } = this.props

    return (
      <div>viri</div>
    )
  }
}
