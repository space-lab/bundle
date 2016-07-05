import './Bundle.css'

export default class Bundle extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return <div className='bundle-view-body'>
      {this.props.children}
    </div>
  }
}
