import { fromJS } from 'immutable'
import request from 'axios'
import api from 'api'
import { reduceBundles, reduceCollections } from 'helpers'

export const getSearchResult = value => async dispatch => {
  if (!value) return dispatch({ type: 'CLEAR_SEARCH_RESULT' })

  const { data } = await request.get(api.searchResource(value))
  const result = {
    bundles: data.bundles.map(bundle => bundle.id),
    collections: data.collections.map(collection => collection.id)
  }

  reduceBundles(data.bundles, dispatch)
  reduceCollections(data.collections, dispatch)

  dispatch({ type: 'SAVE_SEARCH_RESULT', result: fromJS(result) })
}
