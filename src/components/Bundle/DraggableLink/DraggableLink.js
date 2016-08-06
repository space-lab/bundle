import { Link } from 'components'
import { compose, withState } from 'recompose'
import { DragSource, DropTarget } from 'react-dnd'

let cardSource = {
  beginDrag (props) {
    return {
      id: props.id,
      position: props.position
    }
  }
}

let cardTarget = {
  drop (props, monitor, component) {
    let id = monitor.getItem().id
    let dragPosition = monitor.getItem().position
    let hoverPosition = props.position

    if (dragPosition === hoverPosition) return
    props.changeLinkPosition(id, hoverPosition)
  }
}

let enhancer = compose(
  DropTarget('link', cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })),
  DragSource('link', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))
)

class DraggableLink extends React.Component {
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    position: React.PropTypes.number.isRequired,
    changeLinkPosition: React.PropTypes.func
  }

  render () {
    let props = this.props
    let opacity = props.isDragging ? 0 : 1
    let border = props.isOver ? '1px solid rgba(21, 129, 226, 0.33)' : null

    return props.connectDragPreview(props.connectDropTarget(
      <div>
        <Link {...props} draggable linkStyles={{opacity, border}} />
      </div>
    ))
  }
}

export default enhancer(DraggableLink)
