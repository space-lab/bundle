import Header from './header'
import Body from './body'
import './index.css'

export default class ResourceNavigation extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  }

  render () {
    return (
      <div className='resource-navigation'>
        {this.props.children}
      </div>
    )
  }
}

ResourceNavigation.Header = Header
ResourceNavigation.Body = Body
