import { Link, browserHistory } from 'react-router'
import './index.css'

export default class SearchHeader extends React.Component {
  static propTypes = {
    query: React.PropTypes.string
  }

  onChange ({ target }) {
    browserHistory.push(`/search/${target.value}`)
  }

  render () {
    const { query } = this.props

    return (
      <div className='search-header-wrapper'>
        <input
          className='search-input'
          autoFocus
          type='text'
          placeholder='Search...'
          onChange={this.onChange}
          value={query || ''} />

        <Link to='/bundles' className='icon close-icon'/>
      </div>
    )
  }
}
