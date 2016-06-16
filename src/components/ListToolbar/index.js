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
    close: React.PropTypes.func
  }

  renderRegularItems () {
    const {
      resource,
      resourceName,
      favorited,
      favorite,
      unfavorite,
      remove
    } = this.props

    const id = resource.id
    const type = resourceName.toLowerCase()

    return (
      <div className='list-toolbar'>
        <ToolbarShareItem {...this.props}/>

        <ToolbarDeleteItem id={id} remove={remove} />

        <ToolbarFavoriteItem
          type={type}
          id={id}
          favorited={resource.favorited}
          favorite={favorite}
          unfavorite={unfavorite}
        />
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
