import { Map } from 'immutable'

export default function (state = Map(), action) {
  switch (action.type) {
    case 'RECEIVE_SHARES':
      return state.merge(action.shares.toMap().mapKeys((k, v) => v.id))

    case 'SAVE_SHARE':
      return state.set(action.share.id, action.share)

    case 'REMOVE_SHARE':
      return state.delete(action.id)

    default:
      return state
  }
}
