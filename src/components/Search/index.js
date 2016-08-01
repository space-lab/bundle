export default class Search extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  render () {
    return <div>{this.props.children}</div>
  }
}
