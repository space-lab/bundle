export default class Permission extends React.Component {
  static propTypes = {
    check: React.PropTypes.bool.isRequired
  }

  render () {
    return this.props.check ? this.props.children : false
  }
}
