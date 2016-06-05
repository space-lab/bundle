import { List, fromJS } from 'immutable'
import request from 'axios'
import api from 'api'

export const getSearchResult = value => async dispatch => {
  if (!value) return dispatch({ type: 'FETCH_SEARCH_RESULTS' })

  let { data} = await request.get(api.searchResource(value))
  dispatch({ type: 'FETCH_SEARCH_RESULTS', result: fromJS(data) })
}
