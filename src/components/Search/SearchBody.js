import './SearchBody.css'

export default class SearchBody extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  render () {
    return <div className='search-body'>{this.props.children}</div>
  }
}
