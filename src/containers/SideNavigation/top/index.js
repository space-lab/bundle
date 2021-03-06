import { Link } from 'react-router'
import './index.css'

export default class SideNavigationTop extends React.Component {
  static propTypes = {
    onNewClick: React.PropTypes.func.isRequired
  }

  pathname () {
    return window.location.pathname.slice(1).split('/')[0]
  }

  getClass (type) {
    let active = type.includes(this.pathname()) ? '-active' : ''
    return `nav-icon nav-icon-${type}` + active
  }

  render () {
    return <div className='side-navigation-top'>
      <div className='top-nav-list'>
        <Link to='/' className='logo'>B</Link>
        <a onClick={this.props.onNewClick} className='add-new-icon' />
      </div>

      <div className='main-nav-list'>
        <Link to='/bundles' className={this.getClass('bundles')} />
        <Link to='/collections' className={this.getClass('collections')} />
        <Link to='/favorites' className={this.getClass('favorites')} />
      </div>
    </div>
  }
}
