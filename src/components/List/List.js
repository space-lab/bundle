import './List.css'

export default class List extends React.Component  {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  render () {
    return <div className='list-component'>
      {this.props.children}
    </div>
  }
}
