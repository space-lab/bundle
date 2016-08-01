import Immutable from 'immutable'
import createLogger from 'redux-logger'

const optimusPrime = state => {
  let newState = {}

  for (let i of Object.keys(state))
    if (Immutable.Iterable.isIterable(state[i]))
      newState[i] = state[i].toJS()
    else
      newState[i] = state[i]

  return newState
}

export default createLogger({
  collapsed: true,
  duration: true,
  diff: true,
  stateTransformer: optimusPrime,
  actionTransformer: optimusPrime
})
