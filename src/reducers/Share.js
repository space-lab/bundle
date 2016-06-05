import { Map, List } from 'immutable'

let defaultState = Map({
  byId: Map()
})

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_SHARES':
      action.shares.forEach(share => {
        state = state.setIn(['byId', share.id], share)
      })

      return state

    case 'SAVE_SHARE':
      return state.setIn(['byId', action.share.id], action.share)

    case 'REMOVE_SHARE':
      return state.deleteIn(['byId', action.id])
    default:
      return state
  }
}
