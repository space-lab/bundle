import { connect } from 'react-redux'
import { currentUserSelector } from '../../selectors'
import * as userMenuActions from '../../actions/UserMenu'

import SideNavigationTop from './top'
import SideNavigationBottom from './bottom'

import './index.css'

const connectState = (state) => ({
  isOpen: state.UserMenu,
  currentUser: currentUserSelector(state)
})

const connectProps = { ...userMenuActions }

@connect(connectState, connectProps)
export default class SideNavigation extends React.Component {
  render () {
    let { isOpen, openUserMenu, closeUserMenu, currentUser } = this.props

    return (
      <div className='side-navigation'>
        <SideNavigationTop/>
        <SideNavigationBottom isOpen={isOpen} openUserMenu={openUserMenu}
          closeUserMenu={closeUserMenu} currentUser={currentUser}
        />
      </div>
    )
  }
}
