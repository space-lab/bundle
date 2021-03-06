import { Map, List } from 'immutable'

const defaultState = Map({
  bundles: List(),
  collections: List()
})

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SAVE_SEARCH_RESULT':
      return action.result

    case 'CLEAR_SEARCH_RESULT':
      return defaultState

    default:
      return state
  }
}
