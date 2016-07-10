import { fromJS } from 'immutable'
import { Bundle, Collection } from 'records'
import { reduceBundles, reduceCollections } from 'helpers'
import request from 'axios'
import api from 'api'

export const getFavorites = () => async dispatch => {
  let response = await request.get(api.favorites())
  let list = fromJS(response.data).map(item =>
    item.update('favoritable', (item.get('favoritable_type') === 'Bundle')
      ? item => new Bundle(item)
      : item => new Collection(item)))

  let favorites = list.map(item => fromJS({
    id: item.getIn(['favoritable', 'id']),
    type: item.get('favoritable_type'),
    created_at: item.get('created_at')
  }))

  let groupedFavs = list
    .groupBy(item => item.get('favoritable_type'))
    .mapEntries(([k, v]) => [k, v.map(item => item.get('favoritable'))])

  reduceBundles(groupedFavs.get('Bundle', []).toJS(), dispatch)
  reduceCollections(groupedFavs.get('Collection', []).toJS(), dispatch)

  dispatch({ type: 'RECEIVE_FAVORITES', list: favorites })
}

export const favorite = (resource, id) => async dispatch => {
  await request.post(api.favorite(resource, id))

  let type = resource === 'bundle' ? 'FAVORITE_BUNDLE' : 'FAVORITE_COLLECTION'
  dispatch({ type, id })
}

export const unfavorite = (resource, id) => async dispatch => {
  await request.delete(api.favorite(resource, id))

  let type = resource === 'bundle' ? 'UNFAVORITE_BUNDLE' : 'UNFAVORITE_COLLECTION'
  let resourceType = resource === 'bundle' ? 'Bundle' : 'Collection'

  dispatch({ type, id })
  dispatch({ type: 'UNFAVORITE', id, resourceType })
}
