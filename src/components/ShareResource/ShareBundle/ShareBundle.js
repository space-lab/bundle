import { withState } from 'recompose'
import { ShareResource, Permission } from 'components'
import './ShareBundle.css'

let modalState = { isOpen: false, position: null }

let enhancer = withState('shareModal', 'updateShareModal', modalState)

class ShareBundle extends React.Component {
  static propTypes = {
    shareModal: React.PropTypes.object.isRequired,
    updateShareModal: React.PropTypes.func.isRequired
  }

  render () {
    return <div className='share-bundle-wrapper'>
      <button className='main-button'
        onClick={_ => this.props.updateShareModal({ isOpen: true })}>
        Share
      </button>

      <Permission allow={this.props.shareModal.isOpen}>
        <ShareResource {...this.props} />
      </Permission>
    </div>
  }
}
export default enhancer(ShareBundle)
