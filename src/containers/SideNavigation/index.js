import ui from 'redux-ui'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { BundleActions } from 'actions'
import * as Selectors from 'selectors'
import SideNavigationTop from './top'
import SideNavigationBottom from './bottom'
import './index.css'

let connectState = (state) => ({
  currentUser: Selectors.User.current(state)
})

let connectProps = { createBundle: BundleActions.createBundle }

@ui({ key: 'userMenu', state: { isOpen: false } })
@connect(connectState, connectProps)
export default class SideNavigation extends React.Component {
  handleBundleCreate () {
    this.props.createBundle().then(bundle =>
      browserHistory.push('/bundle/' + bundle.id))
  }

  render () {
    let { ui, updateUI, currentUser } = this.props

    return <div className='side-navigation'>
      <SideNavigationTop onNewClick={::this.handleBundleCreate} />

      <SideNavigationBottom
        isOpen={ui.isOpen}
        currentUser={currentUser}
        openUserMenu={() => updateUI('isOpen', true)}
        closeUserMenu={() => updateUI('isOpen', false)} />
    </div>
  }
}
