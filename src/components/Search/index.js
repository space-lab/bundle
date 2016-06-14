import { shouldShow } from 'helpers'
import './index.css'

export default class Search extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    search: React.PropTypes.bool.isRequired
  }

  render () {
    const { onClick, onChange, search } = this.props

    return (
      <div className='search-container-wrapper'>
        <span
          onClick={onClick}
          className='icon search-icon'
          style={shouldShow(search)}/>

        <input
          className='search-input'
          type='text'
          placeholder='Search...'
          style={!shouldShow(search)}
          onChange={(e) => {onChange(e.target.value)}} />
      </div>
    )
  }
}
