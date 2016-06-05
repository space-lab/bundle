import { Link } from 'react-router'
import api from 'api'

export default class Email extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='auth-wrapper'>
        here goes form
      </div>
    )
  }
}

