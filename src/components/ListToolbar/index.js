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
    favorite: React.PropTypes.func.isRequired,
    unfavorite: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired,
    close: React.PropTypes.func,
    getBundle: React.PropTypes.func,
    getCollection: React.PropTypes.func,
    updateUI: React.PropTypes.func.isRequired
  }

  renderRegularItems () {
    let props = this.props
    let id = props.resource.id
    let type = props.resourceName.toLowerCase()

    return (
      <div className='list-toolbar'>
        <ToolbarShareItem
          resource={props.resource}
          resourceName={props.resourceName}
          getBundle={props.getBundle}
          getCollection={props.getCollection}
          updateUI={props.updateUI}/>

        <ToolbarDeleteItem id={id} remove={props.remove}/>

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
