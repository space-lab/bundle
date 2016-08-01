import ui from 'redux-ui'
import { ShareResource, Permission } from 'components'
import './ShareBundle.css'

@ui({ key: 'share-bundle', state: { isOpen: false } })
export default class ShareBundle extends React.Component {
  openModal () {
    this.props.updateUI('isOpen', true)
  }

  render () {
    return <div className='share-bundle-wrapper'>
      <button className='main-button' onClick={::this.openModal}>
        Share
      </button>

      <Permission allow={this.props.ui.isOpen}>
        <ShareResource {...this.props} />
      </Permission>
    </div>
  }
}
