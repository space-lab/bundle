import Header from './header'
import Body from './body'
import './index.css'

export default class ResourceNavigation extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  render () {
    return <div className='resource-navigation flex-none'>
      {this.props.children}
    </div>
  }
}

ResourceNavigation.Header = Header
ResourceNavigation.Body = Body
