export default class Email extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    updateUser: React.PropTypes.func.isRequired
  }

  updateUser () {
    const { user, updateUser } = this.props
    const email = this.refs.email.value

    if (email) updateUser(user, { email })
  }

  render () {
    const { user } = this.props
    return (
      <div className='auth-wrapper'>
        <div className='logo'>B</div>
        <div className='greeting'>
          Welcome <span className='name'>{user.name}</span>!
        </div>

        <div className='auth-content'>
          <div className='title'>Please type in your email to continue.</div>

          <div className='form'>
            <input
              ref='email'
              className='input'
              type='email'
              placeholder='Type in email...'
              autoFocus
              onKeyUp={({ key }) => key === 'Enter' && this.updateUser()}/>

            <div
              className='button'
              onClick={::this.updateUser}>
              Get me in!
            </div>
          </div>
        </div>
      </div>
    )
  }
}

