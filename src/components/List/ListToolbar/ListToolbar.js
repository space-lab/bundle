import ImmutablePropTypes from 'react-immutable-proptypes'
import ToolbarShareItem from './ToolbarShareItem'
import ToolbarCloseItem from './ToolbarCloseItem'
import ToolbarDeleteItem from './ToolbarDeleteItem'
import ToolbarFavoriteItem from './ToolbarFavoriteItem'
import { Permission } from 'components'
import './ListToolbar.css'

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
    updateShareModal: React.PropTypes.func.isRequired
  }

  renderRegularItems () {
    let props = this.props
    let id = props.resource.id
    let type = props.resourceName.toLowerCase()

    return <div className='list-toolbar'>
      <Permission allow={props.resource.canShare(props.currentUser.id)}>
        <ToolbarShareItem
          resource={props.resource}
          resourceName={props.resourceName}
          updateShareModal={props.updateShareModal} />
      </Permission>

      <Permission allow={props.resource.canRemove(props.currentUser.id)}>
        <ToolbarDeleteItem id={props.resource.id} remove={props.remove} />
      </Permission>

      <Permission allow={!props.resource.unlisted}>
        <ToolbarFavoriteItem
          type={type}
          id={id}
          favorited={props.resource.favorited}
          favorite={props.favorite}
          unfavorite={props.unfavorite}/>
      </Permission>
    </div>
  }

  renderEditModeItems () {
    const { resource, close } = this.props

    return <div className='list-toolbar'>
      <ToolbarCloseItem id={resource.id} close={close} />
    </div>
  }

  render () {
    return this.props.resource.editMode
      ? this.renderEditModeItems()
      : this.renderRegularItems()
  }
}
