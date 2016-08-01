import './SearchHeader.css'

export default class SearchHeader extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  render () {
    return <div className='search-header'>{this.props.children}</div>
  }
}
