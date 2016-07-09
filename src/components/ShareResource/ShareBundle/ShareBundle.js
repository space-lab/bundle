import listensToClickOutside from 'react-onclickoutside/decorator'
import ui from 'redux-ui'
import { ShareResource } from 'components'
import './ShareBundle.css'

@ui({ state: { q: '', isOpen: false } })
@listensToClickOutside()
export default class ShareBundle extends React.Component {
  static propTypes = {
    canShare: React.PropTypes.bool.isRequired
  }

  handleClickOutside () {
    if (this.props.ui.isOpen) {
      this.props.updateUI('isOpen', false)
    }
  }

  openModal () {
    this.props.updateUI('isOpen', true)
  }

  render () {
    if (!this.props.canShare) return false

    return <div className='share-bundle-wrapper'>
      <button className='round-button' onClick={::this.openModal}>
        Share
      </button>

      <ShareResource {...this.props} />
    </div>
  }
}
