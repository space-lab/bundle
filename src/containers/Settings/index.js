import { connect } from 'react-redux'
import { Editable } from 'components'
import { UserSelectors } from 'selectors'
import { AlertActions, UserActions } from 'actions'
import './index.css'

let connectState = state => ({
  user: UserSelectors.current(state)
})

let connectProps = {
  ...AlertActions,
  ...UserActions
}

@connect(connectState, connectProps)
export default class Settings extends React.Component {
  componentWillMount () {
    this.setState({
      name: this.props.name,
      email: this.props.email
    })
  }

  // TODO ? fix?
  shouldComponentUpdate () {
    return false
  }

  saveUser () {
    let { user, updateUser, addAlert } = this.props

    updateUser({ id: user.id }, this.state).then(() =>
      addAlert('success', 'yo, update was lit !!!'))
  }

  render () {
    return <div className='settings'>
      <h2 className='title'>Settings</h2>

      <h3 className='label'>Full Name</h3>
      <Editable
        value={this.props.user.name}
        placeholder='Enter Name'
        editMode
        onChange={value => this.setState({ name: value })} />

      <h3 className='label'>Email</h3>
      <Editable
        value={this.props.user.email}
        placeholder='Enter Email'
        editMode
        onChange={value => this.setState({ email: value })} />

      <button className='round-button' onClick={::this.saveUser}>Save</button>
    </div>
  }
}
