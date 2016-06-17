import { connect } from 'react-redux'
import Selectors from 'selectors'
import ui from 'redux-ui'
import SideNavigationTop from './top'
import SideNavigationBottom from './bottom'
import './index.css'

const connectState = (state) => ({
  currentUser: Selectors.currentUser(state)
})

@ui({
  key: 'userMenu',
  state: { isOpen: false }
})
@connect(connectState)
export default class SideNavigation extends React.Component {
  openUserMenu () {
    this.props.updateUI('isOpen', true)
  }

  closeUserMenu () {
    this.props.updateUI('isOpen', false)
  }

  render () {
    const { ui, currentUser } = this.props

    return (
      <div className='side-navigation'>
        <SideNavigationTop/>

        <SideNavigationBottom
          isOpen={this.props.ui.isOpen}
          currentUser={this.props.currentUser}
          closeUserMenu={::this.closeUserMenu}
          openUserMenu={::this.openUserMenu}/>
      </div>
    )
  }
}
