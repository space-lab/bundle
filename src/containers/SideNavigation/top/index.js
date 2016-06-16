import { Link } from 'react-router'
import './index.css'

export default class SideNavigationTop extends React.Component {
  pathname () {
    return window.location.pathname.slice(1).split('/')[0]
  }

  getClass (type) {
    const active = type.includes(this.pathname()) ? '-active' : ''
    return `nav-icon nav-icon-${type}` + active
  }

  render () {
    return (
      <div className='side-navigation-top'>
        <div className='top-nav-list'>
          <Link to='/' className='logo'>B</Link>
          <Link to='/new' className='add-new-icon'/>
        </div>

        <div className='main-nav-list'>
          {['bundles', 'collections', 'favorites'].map(type =>
            <Link key={type} to={'/' + type} className={this.getClass(type)}/>
          )}
        </div>
      </div>
    )
  }
}
