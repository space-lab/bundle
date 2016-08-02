import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { parseId } from 'helpers'
import { UserSelectors, LinkSelectors, BundleSelectors } from 'selectors'
import { ShareActions, UserActions } from 'actions'
import ShareBundle from './Bundle'
import './index.css'

const connectState = (state, props) => ({
  user: UserSelectors.current(state),
  users: UserSelectors.all(state),
  links: LinkSelectors.all(state),
  bundle: BundleSelectors.currentShareBundle(state, props)
})

const connectProps = {
  ...ShareActions,
  ...UserActions
}

class ShareContainer extends React.Component {
  componentWillMount () {
    let { params, user, authenticateUser, getResource } = this.props
    let auth_token = localStorage.getItem('auth_token')

    if (!user && auth_token) authenticateUser(auth_token)

    getResource(params.resource, parseId(params.id), params.token)
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

export default connect(connectState, connectProps)(ShareContainer)
