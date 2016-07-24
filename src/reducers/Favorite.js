import { Map } from 'immutable'

export default function (state = Map(), action) {
  switch (action.type) {
    case 'RECEIVE_FAVORITES':
      action.list.forEach(favorite => {
        let id = favorite.get('id') + '-' + favorite.get('type')
        state = state.set(id, favorite)
      })

      return state

    case 'UNFAVORITE':
      return state.delete(action.id + '-' + action.resourceType)

    case 'REMOVE_FAVORITE':
      return state.delete(action.id + '-' + action.resourceType)

    default:
      return state
  }
}
