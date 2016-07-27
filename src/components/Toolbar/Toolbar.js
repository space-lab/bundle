export default class Toolbar extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  render () {
    return <div className="toolbar">{this.props.children}</div>
  }
}
