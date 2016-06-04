import ImmutablePropTypes from 'react-immutable-proptypes'
import listensToClickOutside from 'react-onclickoutside/decorator'
import ui from 'redux-ui'
import './index.css'
import Modal from './Modal'

@ui({
  state: { q: '', isOpen: false }
})
@listensToClickOutside()
export default class ShareResource extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record,
    resourceName: React.PropTypes.string
  }

  handleClickOutside (e) {
    if (this.props.ui.isOpen) {
      this.props.updateUI('isOpen', false)
    }
  }

  openModal () {
    this.props.updateUI('isOpen', true)
  }

  render () {
    return (
      <div className='share-resource-wrapper'>
        <button className='button' onClick={::this.openModal}>
          Share
        </button>

        <Modal {...this.props} />
      </div>
    )
  }
}
