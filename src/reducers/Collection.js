export default function (state = { list: [] }, action) {
  switch (action.type) {
    case 'RECEIVE_COLLECTIONS':
      return { ...state, list: action.list }

    case 'RECEIVE_COLLECTION':
      return { ...state, current: action.collection }

    case 'FAVORITE_COLLECTION':
      var newState = { ...state }
      console.log('fav', action.id)
      newState.list = newState.list.map(collection => {
        if (collection.id === action.id) collection.favorited = true
        return collection
      })
      return newState

    case 'UNFAVORITE_COLLECTION':
      var newState = { ...state }
      console.log('unfav', action.id)
      newState.list = newState.list.map(collection => {
        if (collection.id == action.id) collection.favorited = false
        return collection
      })
      return newState

    case 'REMOVE_COLLECTION':
      var newState = { ...state }
      newState.list = newState.list.filter(collection => collection.id !== action.id)
      return newState

    case 'EDIT_MODE_COLLECTION':
      var newState = { ...state }
      newState.list = newState.list.map(collection => {
        if (collection.id == action.id) collection.editMode = action.editMode
        return collection
      })
      return newState

    case 'RENAME_COLLECTION':
      var newState = { ...state }
      newState.list = newState.list.map(collection => {
        if (collection.id == action.id) {
          collection.name = action.name
          collection.editMode = false // TODO baad kitty bad kitty
        }

        return collection
      })
      return newState

    default:
      return state
  }
}
