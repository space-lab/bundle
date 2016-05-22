export default class ToolbarCloseItem extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    close: React.PropTypes.func.isRequired
  }

  render () {
    let { id, close } = this.props

    return (
      <div className='icon icon-toolbar-close'
        onClick={close.bind(this, id)}
      />
    )
  }
}
