import { Map } from 'immutable'

export default function (state = Map(), action) {
  switch (action.type) {
    case 'RECEIVE_FAVORITES':
      return state.merge(action.list.toMap().mapKeys((k, v) => {
        return v.get('id') + '-' + v.get('type')
      }))

    case 'UNFAVORITE':
      return state.delete(action.id + '-' + action.resourceType)

    case 'REMOVE_FAVORITE':
      return state.delete(action.id + '-' + action.resourceType)

    default:
      return state
  }
}
