import ImmutablePropTypes from 'react-immutable-proptypes'
import './index.css'

export default class SearchBody extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  render () {
    return (
      <div className='search-results-wrapper'>
        {this.props.children}
      </div>
    )
  }
}
