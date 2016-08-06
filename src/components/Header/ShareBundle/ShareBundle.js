import ImmutablePropTypes from 'react-immutable-proptypes'
import { withState } from 'recompose'
import { ShareResource, Permission } from 'components'
import './ShareBundle.css'

let modalState = { isOpen: false, position: null }

let enhancer = withState('shareModal', 'updateShareModal', modalState)

class ShareBundle extends React.Component {
  static propTypes = {
    shareModal: React.PropTypes.object.isRequired,
    updateShareModal: React.PropTypes.func.isRequired,
    resource: ImmutablePropTypes.record.isRequired,
    users: ImmutablePropTypes.map.isRequired
  }

  render () {
    let props = this.props
    let allUsers = props.resource.shares.map(share => share.user)
      .unshift(props.users.get(props.resource.creator))

    let users = allUsers.take(5).reverse()
    let moreUsers = allUsers.size - 5
    console.log(moreUsers)

    return <div className='share-bundle-wrapper'>
      <div className='share-clicker' onClick={_ => props.updateShareModal({ isOpen: true })}>
        <Permission allow={users.size > 1}>
          <ul className='share-user-images'>
            {users.map(user =>
              <li key={user.id}><img src={user.image} /></li>
            )}
          </ul>
        </Permission>

        <Permission allow={moreUsers > 1}>
          <span className='share-more-users'>and {moreUsers} more</span>
        </Permission>

        <button className='main-button'>Share</button>
      </div>

      <Permission allow={props.shareModal.isOpen}>
        <ShareResource {...props} />
      </Permission>
    </div>
  }
}
export default enhancer(ShareBundle)
