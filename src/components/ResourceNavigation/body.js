import './body.css'

export default class Body extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return <div className='resource-navigation-body flex-1'>
      {this.props.children}
    </div>
  }
}
