import './body.css'

export default class Body extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return <div className='resource-navigation-body'>
      {this.props.children}
    </div>
  }
}
