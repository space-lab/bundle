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

    default:
      return state
  }
}
