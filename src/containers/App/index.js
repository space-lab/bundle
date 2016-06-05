import { SideNavigation, Alerts, Auth } from 'containers'
import './style.css'

export default class App extends React.Component {
  render () {
    let { children } = this.props

    return (
      <Auth location={this.props.location}>
        <div className='application-container'>
          <Alerts />
          <SideNavigation />
          {children}
        </div>
      </Auth>
    )
  }
}
