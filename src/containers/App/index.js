import { SideNavigation, Alerts, Auth } from 'containers'

export default class App extends React.Component {
  render () {
    return <Auth location={this.props.location}>
      <div className='application-container viewport flex-row'>
        <Alerts />
        <SideNavigation />
        {this.props.children}
      </div>
    </Auth>
  }
}
