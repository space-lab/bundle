import { fromJS } from 'immutable'

export const addAlert = (type, list) => {
  if (typeof list === 'string') list = [list]
  return { type: 'ADD_ALERT', alert: fromJS({ type, list }) }
}

export const removeAlert = () => ({ type: 'REMOVE_ALERT' })
