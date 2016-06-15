import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import { Modal, Menu, UserMenu } from 'components'

export default class SideNavigationBottom extends React.Component {
  static propTypes = {
    currentUser: ImmutablePropTypes.record.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    openUserMenu: React.PropTypes.func.isRequired,
    closeUserMenu: React.PropTypes.func.isRequired
  }

  render () {
    const {
      isOpen,
      openUserMenu,
      closeUserMenu,
      currentUser
    } = this.props

    return (
      <div className='side-navigation-bottom'>
        <UserMenu
          isOpen={isOpen}
          openUserMenu={openUserMenu}
          closeUserMenu={closeUserMenu}
          userImage={currentUser.image}>

          <Modal style={{left: '70px', bottom: '40px'}}>
            <Menu  headline={currentUser.name}>
              <Link to='/settings' onClick={closeUserMenu}>Settings</Link>
              <Link to='/logout'>Sign Out</Link>
            </Menu>
          </Modal>
        </UserMenu>
      </div>
    )
  }
}
