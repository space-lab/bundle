import { DateTime } from 'components'
import { compose, withState } from 'recompose'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { urlDomain } from 'helpers'
import './Link.css'

let ItemTypes = { CARD: 'card' }

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      position: props.position
    };
  }
};

const handleStyle = {
  backgroundColor: 'green',
  width: '1rem',
  height: '1rem',
  display: 'inline-block',
  marginRight: '0.75rem',
  cursor: 'move',
  marginLeft: '-20px'
};

const cardTarget = {
  drop(props, monitor, component) {
    let id = monitor.getItem().id
    let dragPosition = monitor.getItem().position
    let hoverPosition = props.position

    if (dragPosition === hoverPosition) return
    props.changeLinkPosition(id, hoverPosition)
  }
}

let enhancer = compose(
  DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })),
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))
)

class Link extends React.Component {
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    position: React.PropTypes.number.isRequired,
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

    const { isDragging, connectDragSource, connectDragPreview, connectDropTarget } = this.props
    const opacity = isDragging ? 0 : 1;
    const border = this.props.isOver ? '2px solid yellow' : '1px solid rgba(0, 0, 0, 0.09)'

    return connectDragPreview(connectDropTarget(
      <a href={url} target='_blank'>
        <div className={linkClass} style={{ opacity, border }}>
          {connectDragSource(
             <div style={handleStyle} />
             )
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
    ))
  }
}

export default enhancer(Link)
