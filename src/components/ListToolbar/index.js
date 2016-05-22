import ToolbarShareItem from './ToolbarShareItem'
import ToolbarCloseItem from './ToolbarCloseItem'
import ToolbarDeleteItem from './ToolbarDeleteItem'
import ToolbarFavoriteItem from './ToolbarFavoriteItem'

import './index.css'

export default class ListToolbar extends React.Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    favorited: React.PropTypes.bool,
    favorite: React.PropTypes.func.isRequired,
    unfavorite: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired,
    close: React.PropTypes.func,
    editMode: React.PropTypes.bool
  }

  renderRegularItems () {
    let {
      type,
      id,
      favorited,
      favorite,
      unfavorite,
      remove
    } = this.props

    return (
      <div className='list-toolbar'>
        <ToolbarShareItem />

        <ToolbarDeleteItem id={id} remove={remove} />

        <ToolbarFavoriteItem
          type={type}
          id={id}
          favorited={favorited}
          favorite={favorite}
          unfavorite={unfavorite}
        />
      </div>
    )
  }

  renderEditModeItems () {
    let { id, close } = this.props

    return (
      <div className='list-toolbar'>
        <ToolbarCloseItem id={id} close={close} />
      </div>
    )
  }

  render () {
    return this.props.editMode
      ? this.renderEditModeItems()
      : this.renderRegularItems()
  }
}
