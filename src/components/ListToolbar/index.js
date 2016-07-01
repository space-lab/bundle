import ImmutablePropTypes from 'react-immutable-proptypes'
import ToolbarShareItem from './ToolbarShareItem'
import ToolbarCloseItem from './ToolbarCloseItem'
import ToolbarDeleteItem from './ToolbarDeleteItem'
import ToolbarFavoriteItem from './ToolbarFavoriteItem'
import './index.css'

export default class ListToolbar extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired,
    resourceName: React.PropTypes.string.isRequired,
    currentUser: ImmutablePropTypes.record.isRequired,
    favorite: React.PropTypes.func.isRequired,
    unfavorite: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired,
    close: React.PropTypes.func,
    getBundle: React.PropTypes.func,
    getCollection: React.PropTypes.func,
    updateUI: React.PropTypes.func.isRequired
  }

  renderShareIcon () {
    let props = this.props
    if (!props.resource.canShare(props.currentUser.id)) return false

    return <ToolbarShareItem
      resource={props.resource}
      resourceName={props.resourceName}
      getBundle={props.getBundle}
      getCollection={props.getCollection}
      updateUI={props.updateUI}/>
  }

  renderRemoveIcon () {
    let props = this.props
    if (!props.resource.canRemove(props.currentUser.id)) return false

    return <ToolbarDeleteItem id={props.resource.id} remove={props.remove}/>
  }

  renderRegularItems () {
    let props = this.props
    let id = props.resource.id
    let type = props.resourceName.toLowerCase()

    return (
      <div className='list-toolbar'>
        {this.renderShareIcon()}
        {this.renderRemoveIcon()}

        <ToolbarFavoriteItem
          type={type}
          id={id}
          favorited={props.resource.favorited}
          favorite={props.favorite}
          unfavorite={props.unfavorite}/>
      </div>
    )
  }

  renderEditModeItems () {
    const { resource, close } = this.props

    return (
      <div className='list-toolbar'>
        <ToolbarCloseItem id={resource.id} close={close} />
      </div>
    )
  }

  render () {
    return this.props.resource.editMode
      ? this.renderEditModeItems()
      : this.renderRegularItems()
  }
}
