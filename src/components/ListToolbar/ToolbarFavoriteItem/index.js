export default function ToolbarFavoriteItem ({
  id,
  type,
  favorite,
  favorited,
  unfavorite
}) {
  if (favorited) {
    return <div className='icon icon-toolbar-favorite-full'
      onClick={unfavorite.bind(this, type, id)}
    />
  } else {
    return <div className='icon icon-toolbar-favorite'
      onClick={favorite.bind(this, type, id)}
    />
  }
}

ToolbarFavoriteItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  favorited: React.PropTypes.bool.isRequired,
  favorite: React.PropTypes.func.isRequired,
  unfavorite: React.PropTypes.func.isRequired
}
