import { isUrl } from 'helpers'
import './EnterUrl.css'

export default class EnterUrl extends React.Component {
  static propTypes = {
    bundleId: React.PropTypes.string.isRequired,
    handeUrlEnter: React.PropTypes.func.isRequired,
    userImage: React.PropTypes.string.isRequired,
    autoFocus: React.PropTypes.bool
  }

  handleChange ({ target }) {
    let url = target.value
    if (isUrl(url)) this.props.handeUrlEnter(url, this.props.bundleId)
  }

  render () {
    let { userImage, handeUrlEnter, bundleId, autoFocus } = this.props

    return (
      <div className='add-link-enter-url'>
        <img className='creator-image' src={userImage}/>

        <input
          className='url-input'
          placeholder='Enter URL here and press Enter...'
          autoFocus={autoFocus}
          onChange={::this.handleChange} />
      </div>
    )
  }
}
