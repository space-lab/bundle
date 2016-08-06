import { DateTime } from 'components'
import { urlDomain } from 'helpers'
import './Link.css'

export default class Link extends React.Component {
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    url: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool,
    createdAt: React.PropTypes.string,
    creatorImage: React.PropTypes.string.isRequired,
    creatorName: React.PropTypes.string.isRequired,
    children: React.PropTypes.element,
    changeLinkPosition: React.PropTypes.func
  }

  renderDate () {
    return <span> ⋅ Added <DateTime type='fromNow'>{this.props.createdAt}</DateTime></span>
  }

  render () {
    let { url, image, title, description, completed, createdAt, creatorName, creatorImage,
      onMouseEnter, onMouseLeave, children } = this.props

    let thumbStyles = { backgroundImage: `url(${image})` }
    let linkClass = 'link-component' + (completed ? ' completed' : '')

    return (
      <a href={url} target='_blank'>
        <div className={linkClass} style={this.props.linkStyles}>
          { this.props.draggable
            ? this.props.connectDragSource(<div className='link-drag-handler'>☰</div>)
            : null
          }

          <div style={thumbStyles} className='link-thumbnail' />

          <div className='link-content'>
            <span className='link-title'>{title}</span>
            <span className='link-description'>{description}</span>

            <span className='link-metadata'>
              <span>On {urlDomain(this.props.url)}</span>
              {createdAt && this.renderDate()}
            </span>

            <div className='link-creator'>
              <img className='link-author-image' src={creatorImage} />
              <span>{creatorName}</span>
            </div>

            {this.props.children}
          </div>
        </div>
      </a>
    )
  }
}
