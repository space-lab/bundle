import ui from 'redux-ui'
import { Date } from 'components'
import { urlDomain, shouldAppear } from 'helpers'
import './Link.css'

@ui({ state: { active: false } })
export default class Link extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    createdAt: React.PropTypes.string.isRequired,
    creatorImage: React.PropTypes.string.isRequired,
    creatorName: React.PropTypes.string.isRequired
  }

  handleLinkRemove (event) {
    if (confirm('are you sure?'))
      this.props.handleLinkRemove()

    event.preventDefault()
  }

  render () {
    let {
      url, image, title, description,
      createdAt, creatorName, creatorImage,
      ui, updateUI
    } = this.props

    let thumbStyles = { backgroundImage: `url(${image})` }

    return (
      <a href={url}
        target='_blank'
        onMouseEnter={() => updateUI('active', true)}
        onMouseLeave={() => updateUI('active', false)}>
        <div className='link-component'>
          <div style={thumbStyles} className='link-thumbnail' />

          <div className='link-content'>
            <span className='link-title' alt={title}>{title}</span>
            <span className='link-description' alt={description}>{description}</span>

            <span className='link-metadata'>
              <span>On {urlDomain(url)}</span>
              <span> ⋅ </span>
              <span>Added <Date type='fromNow'>{createdAt}</Date></span>
            </span>

            <div className='link-creator'>
              <img class='link-author-image' src={creatorImage} />
              <span>{creatorName}</span>
            </div>

            <div className='link-remove'
              style={shouldAppear(ui.active)}
              onClick={::this.handleLinkRemove} />
          </div>
        </div>
      </a>
    )
  }
}
