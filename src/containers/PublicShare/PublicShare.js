import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Bundle, Link as BundleLink } from 'components'
import { parseId } from 'helpers'
import { UserSelectors, LinkSelectors, BundleSelectors } from 'selectors'
import { ShareActions, UserActions } from 'actions'
import './PublicShare.css'

let connectState = (state, props) => ({
  user: UserSelectors.current(state),
  users: UserSelectors.all(state),
  links: LinkSelectors.all(state),
  bundle: BundleSelectors.currentShareBundle(state, props)
})

let connectProps = {
  ...ShareActions,
  ...UserActions
}

let enhancer = connect(connectState, connectProps)

class PublicShare extends React.Component {
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
    let { user, bundle, users, links, params, location } = this.props
    if (!bundle || user) return false

    return <div className='share-view'>
      <Link to='/' className='logo'>B</Link>

      <Bundle className='share-view-body'>
        <span className='bundle-name'>{bundle.name}</span>
        <span className='bundle-description'>{bundle.description}</span>

        {bundle.get('links').map((id, index) => {
          let link = links.get(id)
          let user = users.get(link.creator)

          return <BundleLink key={link.id}
            url={link.url}
            image={link.image}
            title={link.title || 'Link has no name'}
            description={link.description || ''}
            createdAt={link.created_at}
            creatorName={user.name}
            creatorImage={user.image} />
        })}
      </Bundle>
    </div>
  }
}
