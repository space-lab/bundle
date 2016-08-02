import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import { browserHistory } from 'react-router'
import { BundleActions } from 'actions'
import { UserSelectors } from 'selectors'
import SideNavigationTop from './top'
import SideNavigationBottom from './bottom'
import './index.css'

let connectState = state => ({
  currentUser: UserSelectors.current(state)
})

let connectProps = {
  createBundle: BundleActions.createBundle
}

let enhancer = compose(
  connect(connectState, connectProps),
  withState('userMenuIsOpen', 'showUserMenu', false)
)

class SideNavigation extends React.Component {
  handleBundleCreate () {
    this.props.createBundle().then(bundle =>
      browserHistory.push('/bundle/' + bundle.id))
  }

  render () {
    let { userMenuIsOpen, showUserMenu, currentUser } = this.props

    return <div className='side-navigation flex-none'>
      <SideNavigationTop onNewClick={::this.handleBundleCreate} />

      <SideNavigationBottom
        currentUser={currentUser}
        isOpen={userMenuIsOpen}
        openUserMenu={_ => showUserMenu(true)}
        closeUserMenu={_ => showUserMenu(false)} />
    </div>
  }
}

export default enhancer(SideNavigation)
