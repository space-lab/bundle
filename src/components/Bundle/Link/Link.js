import { DateTime } from 'components'
import { compose, withState } from 'recompose'
import { DragSource, DropTarget } from 'react-dnd'
import { urlDomain } from 'helpers'
import './Link.css'

let ItemTypes = { CARD: 'card' }

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
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
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
}

let enhancer = compose(
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))
)

class Link extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool,
    createdAt: React.PropTypes.string,
    creatorImage: React.PropTypes.string.isRequired,
    creatorName: React.PropTypes.string.isRequired,
    children: React.PropTypes.element
  }

  renderDate () {
    return <span> ⋅ Added <DateTime type='fromNow'>{this.props.createdAt}</DateTime></span>
  }

  render () {
    let { url, image, title, description, completed, createdAt, creatorName, creatorImage,
      onMouseEnter, onMouseLeave, children } = this.props

    let thumbStyles = { backgroundImage: `url(${image})` }
    let linkClass = 'link-component' + (completed ? ' completed' : '')

    const { isDragging, connectDragSource, connectDragPreview } = this.props
    const opacity = isDragging ? 0 : 1;

    return connectDragPreview(
      <a href={url} target='_blank'>
        <div className={linkClass} style={{ opacity }}>
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
    )
  }
}

export default enhancer(Link)
