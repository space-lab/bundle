export default class ToolbarDeleteItem extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    remove: React.PropTypes.func.isRequired
  }

  delete (id) {
    if (window.confirm('are you sure?')) {
      this.props.remove(id)
    }
  }

  render () {
    return (
      <div className='icon icon-toolbar-delete'
        onClick={this.delete.bind(this, this.props.id)}
      />
    )
  }
}
