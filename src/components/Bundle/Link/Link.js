import ui from 'redux-ui'
import { Editable, DateTime } from 'components'
import { urlDomain, shouldAppear } from 'helpers'
import './Link.css'

@ui({ state: { active: false, } })
export default class Link extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool,
    //createdAt: React.PropTypes.string.isRequired, //TODO: fix
    creatorImage: React.PropTypes.string.isRequired,
    creatorName: React.PropTypes.string.isRequired,
    handleLinkRemove: React.PropTypes.func,
    handleLinkComplete: React.PropTypes.func,
    canRemove: React.PropTypes.bool,
    canComplete: React.PropTypes.bool,
  }

  handleLinkRemove (event) {
    if (confirm('are you sure?'))
      this.props.handleLinkRemove()

    event.preventDefault()
  }

  renderLinkRemove () {
    let { canRemove, ui } = this.props

    if (!canRemove) return

    return <div className='link-remove'
      style={shouldAppear(ui.active)}
      onClick={::this.handleLinkRemove} />
  }

  renderCompleteLink () {
    let { canComplete, completed, ui, handleLinkComplete } = this.props
    let className = 'link-complete' + (completed ? ' completed' : '')

    if (!canComplete) return

    return <div className={className}
      style={shouldAppear(ui.active)}
      onClick={handleLinkComplete}>
        ✔
      </div>
  }

  render () {
    let {
      url,
      image,
      title,
      description,
      completed,
      createdAt,
      creatorName,
      creatorImage,
      updateUI,
      ui,
    } = this.props

    let thumbStyles = { backgroundImage: `url(${image})` }
    let linkClass = 'link-component' + (completed ? ' completed' : '')

    return <a href={url}
      target='_blank'
      onMouseEnter={() => updateUI('active', true)}
      onMouseLeave={() => updateUI('active', false)}>
      <div className={linkClass}>
        <div style={thumbStyles} className='link-thumbnail' />

        <div className='link-content'>
          <span className='link-title'>{title}</span>
          <span className='link-description'>{description}</span>

          <span className='link-metadata'>
            <span>On {urlDomain(url)}</span>
            <span> ⋅ </span>
            <span>
              Added <DateTime type='fromNow'>{createdAt}</DateTime>
            </span>
          </span>

          <div className='link-creator'>
            <img className='link-author-image' src={creatorImage} />
            <span>{creatorName}</span>
          </div>

          {this.renderCompleteLink()}
          {this.renderLinkRemove()}
        </div>
      </div>
    </a>
  }
}
