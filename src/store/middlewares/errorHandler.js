import { applyMiddleware } from 'redux'
import { addAlert } from 'actions/Alert'

export default () => next => action => {
  return typeof action === 'function'
    ? next(async (dispatch, getState) => {
        try {
          return await action(dispatch, getState)
        } catch (error) {
          if (error && error.data || error.statusText)
            return dispatch(addAlert('error',
              error.data
                ? error.data.errors
                : error.statusText))
          else
            throw error
        }
      })
    : next(action)
}
