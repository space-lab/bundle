import './Bundle.css'

export default class Bundle extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string
  }

  render () {
    return <div className={this.props.className || 'bundle-view-body'}>
      {this.props.children}
    </div>
  }
}
