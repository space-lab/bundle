import listensToClickOutside from 'react-onclickoutside'
import './index.css'

export default class UserMenu extends React.Component {
  static propTypes = {
    userImage: React.PropTypes.string.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    openUserMenu: React.PropTypes.func.isRequired,
    closeUserMenu: React.PropTypes.func.isRequired,
    children: React.PropTypes.element
  }

  handleClickOutside () {
    this.props.isOpen && this.props.closeUserMenu()
  }

  render () {
    const { children, isOpen, openUserMenu, userImage } = this.props

    return <div className='user-menu'>
      {isOpen ? children : null}

      <div className='avatar-holder' onClick={openUserMenu}>
        <img src={userImage} />
      </div>
    </div>
  }
}

export default listensToClickOutside(UserMenu)
