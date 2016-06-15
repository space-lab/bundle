import { fromJS } from 'immutable'
import { Bundle, Collection } from 'records'
import request from 'axios'
import api from 'api'

export const getFavorites = () => async dispatch => {
  const response = await request.get(api.favorites())
  const list = fromJS(response.data).map(item =>
    item.update('favoritable', (item.get('favoritable_type') === 'Bundle')
      ? item => new Bundle(item)
      : item => new Collection(item)))

  const favorites = list.map(item => fromJS({
    id: item.getIn(['favoritable', 'id']),
    type: item.get('favoritable_type'),
    created_at: item.get('created_at')
  }))

  const groupedFavs = list
    .groupBy(item => item.get('favoritable_type'))
    .mapEntries(([k, v]) => [k, v.map(item => item.get('favoritable'))])

  dispatch({ type: 'RECEIVE_COLLECTIONS', collections: groupedFavs.get('Collection', []) })
  dispatch({ type: 'RECEIVE_BUNDLES', bundles: groupedFavs.get('Bundle', []) })
  dispatch({ type: 'RECEIVE_FAVORITES', list: favorites })
}

export const favorite = (resource, id) => async dispatch => {
  await request.post(api.favorite(resource, id))

  const type = resource === 'bundle' ? 'FAVORITE_BUNDLE' : 'FAVORITE_COLLECTION'
  dispatch({ type, id })
}

export const unfavorite = (resource, id) => async dispatch => {
  await request.delete(api.favorite(resource, id))

  const type = resource === 'bundle' ? 'UNFAVORITE_BUNDLE' : 'UNFAVORITE_COLLECTION'
  const resourceType = resource === 'bundle' ? 'Bundle' : 'Collection'

  dispatch({ type, id })
  dispatch({ type: 'UNFAVORITE', id, resourceType })
}
