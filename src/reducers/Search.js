import { Map, List } from 'immutable'

const defaultState = Map({
  bundles: List(),
  collections: List()
})

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SAVE_SEARCH_RESULTS':
      return action.result

    case 'CLEAR_SEARCH_RESULTS':
      return defaultState

    default:
      return state
  }
}
