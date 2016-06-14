import { fromJS } from 'immutable'
import request from 'axios'
import api from 'api'
import { reduceCollection, reduceBundle } from 'helpers'

export const getSearchResult = value => async dispatch => {
  if (!value) return dispatch({ type: 'FETCH_SEARCH_RESULTS' })

  const { data } = await request.get(api.searchResource(value))
  const result = {
    bundles: data.bundles.map(bundle => bundle.id),
    collections: data.collections.map(collection => collection.id)
  }

  reduceBundle(data.bundles, null, dispatch, true)
  reduceCollection(data.collections, dispatch, true)

  dispatch({ type: 'SAVE_SEARCH_RESULT', result: fromJS(result) })
}
