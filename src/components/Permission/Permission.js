export default class Permission extends React.Component {
  static propTypes = {
    allow: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element.isRequired
  }

  render () {
    return this.props.allow ? this.props.children : false
  }
}
