import listensToClickOutside from 'react-onclickoutside'
import { Modal, Menu } from 'components'
import './CollectionActionsModal.css'

let enhancer = listensToClickOutside

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
    return <div className='collection-actions'>
      <Modal style={{left: '0px', top: '-30px'}}>
        <Menu>
          {this.props.children}
        </Menu>
      </Modal>
    </div>
  }
}

export default enhancer(CollectionActionsModal)
