import './EnterUrl.css'

export default class EnterUrl extends React.Component {
  static propTypes = {
    bundleId: React.PropTypes.string.isRequired,
    handeUrlEnter: React.PropTypes.func.isRequired,
    userImage: React.PropTypes.string.isRequired,
    autoFocus: React.PropTypes.bool
  }

  handleKeyPress (bundleId, handeUrlEnter, { target, key }) {
    let url = target.value
    if (key === 'Enter') handeUrlEnter(url, bundleId)
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
          onKeyPress={this.handleKeyPress.bind(this, bundleId, handeUrlEnter)}/>
      </div>
    )
  }
}
