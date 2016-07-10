import ui from 'redux-ui'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import Selectors from 'selectors'
import * as userActions from 'actions/User'
import * as shareActions from 'actions/Share'
import ShareBundle from './Bundle'
import './index.css'

const connectState = (state, props) => ({
  user: Selectors.currentUser(state),
  bundle: Selectors.currentShareBundle(state, props),
  users: state.User.get('byId'),
  links: state.Link.get('byId')
})

const connectProps = {
  ...shareActions,
  ...userActions
}

@ui({
  key: 'bundle',
  state: {
    editMode: false,
    name: '',
    description: ''
  }
})
@connect(connectState, connectProps)
export default class ShareContainer extends React.Component {
  componentWillMount () {
    let { params, user, authenticateUser, getResource } = this.props
    let auth_token = localStorage.getItem('auth_token')

    if (!user && auth_token) authenticateUser(auth_token)

    getResource(params.resource, params.id, params.token)
  }

  componentWillReceiveProps (props) {
    let { user, params } = props

    if (user) {
      return browserHistory.push(`/${params.resource}/${params.id}`)
    }
  }

  render () {
    let { user, bundle } = this.props
    if (!bundle || user) return false

    return (
      <div className='share-view'>
        <Link to='/' className='logo'>B</Link>

        <ShareBundle {...this.props}/>
      </div>
    )
  }
}