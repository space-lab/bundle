import listensToClickOutside from 'react-onclickoutside'
import { Modal, Menu } from 'components'
import './CollectionActionsModal.css'

class CollectionActionsModal extends React.Component {
  static propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    closeModal: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired
  }

  handleClickOutside () {
    this.props.isOpen && this.props.closeModal()
  }

  render () {
    if (!this.props.isOpen) return false

    return (
      <div className='collection-actions'>
        <Modal style={{left: '0px', top: '-30px'}}>
          <Menu headline='Actions'>
            {this.props.children}
          </Menu>
        </Modal>
      </div>
    )
  }
}

export default listensToClickOutside(CollectionActionsModal)
