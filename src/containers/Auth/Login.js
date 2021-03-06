import { Link } from 'react-router'
import api from 'api'

export default class Login extends React.Component {
  render () {
    return (
      <div className='auth-wrapper'>
        <Link to='/' className='logo'>B</Link>

        <div className='description'>Bundle up your resources together for love</div>
        <div className='auth-content'>
          <a className='method button facebook' href={api.auth('facebook')}>
            Authenticate With Facebook
          </a>
          <a className='method button twitter' href={api.auth('twitter')}>
            Authenticate With Twitter
          </a>
        </div>
      </div>
    )
  }
}

