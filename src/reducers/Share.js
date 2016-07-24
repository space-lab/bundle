import { Map } from 'immutable'

export default function (state = Map(), action) {
  switch (action.type) {
    case 'RECEIVE_SHARES':
      action.shares.forEach(share =>
        state = state.set(share.id, share))

      return state

    case 'SAVE_SHARE':
      return state.set(action.share.id, action.share)

    case 'REMOVE_SHARE':
      return state.delete(action.id)
    default:
      return state
  }
}
