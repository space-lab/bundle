import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import ui from 'redux-ui'

import Selectors from 'selectors'
import * as userActions from 'actions/User'
import * as alertActions from 'actions/Alert'
import { Editable } from 'components'
import './index.css'

const connectState = state => ({
  user: Selectors.currentUser(state)
})

const connectProps = {
  ...userActions,
  ...alertActions
}

@ui({
  key: 'user-settings',
  state: {
    name: '',
    email: ''
  }
})
@connect(connectState, connectProps)
export default class Settings extends React.Component {
  saveUser () {
    const { user, ui, updateUser, addAlert } = this.props
    const payload = {
      name: ui.name,
      email: ui.email
    }

    updateUser({ id: user.id }, payload).then(() =>
      addAlert('success', 'yo, update was lit !!!')
    )
  }

  render () {
    const { user, updateUI } = this.props

    return <div className='settings'>
      <h2 className='title'>Settings</h2>

      <h3 className='label'>Full Name</h3>
      <Editable
        value={user.name}
        placeholder='Enter Name'
        editMode={true}
        onChange={value => updateUI('name', value)} />

      <h3 className='label'>Email</h3>
      <Editable
        value={user.email}
        placeholder='Enter Email'
        editMode={true}
        onChange={value => updateUI('email', value)} />

      <button className='round-button' onClick={::this.saveUser}>Save</button>
    </div>
  }
}
