import listensToClickOutside from 'react-onclickoutside'
import ui from 'redux-ui'
import { ShareResource } from 'components'
import './ShareBundle.css'

class ShareBundle extends React.Component {
  handleClickOutside () {
    if (this.props.ui.isOpen) {
      this.props.updateUI('isOpen', false)
    }
  }

  openModal () {
    this.props.updateUI('isOpen', true)
  }

  render () {
    return <div className='share-bundle-wrapper'>
      <button className='main-button' onClick={::this.openModal}>
        Share
      </button>

      <ShareResource {...this.props} />
    </div>
  }
}

export default ui({ state: { q: '', isOpen: false } })(listensToClickOutside(ShareBundle))
