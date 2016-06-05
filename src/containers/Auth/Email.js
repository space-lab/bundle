import api from 'api'

export default class Email extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired
  }

  updateUserEmail () {
    const { updateUserEmail } = this.props
    const email = this.refs.email.value

    if (email) updateUserEmail(email)
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
              autoFocus={true}
              onKeyUp={({ key }) => key === 'Enter' && this.updateUserEmail()}/>

            <div
              className='button'
              onClick={::this.updateUserEmail}>
              Get me in!
            </div>
          </div>
        </div>
      </div>
    )
  }
}

