import { normalize } from 'normalizr-immutable'
import { bestThumbnail } from 'helpers'
import * as Schemas from 'normalizers'
import { Link } from 'records'
import request from 'axios'
import api from 'api'

export const fetchLink = (url, bundleId) => async dispatch => {
  let { data } = await request.get(api.fetchLink(url))

  let link = new Link({
    url: data.url,
    title: data.title,
    description: data.description,
    image: bestThumbnail(data)
  })

  dispatch({ type: 'SET_CURRENT_LINK', link, bundleId })
}

export const clearCurrentLink = bundleId => ({
  type: 'CLEAR_CURRENT_LINK', bundleId
})

export const addLink = (link, bundleId) => async dispatch =>  {
  let payload = link.toMap().set('bundle_id', bundleId).toJS()
  let { data } = await request.post(api.link(), payload)
  let result = normalize(data, Schemas.link).entities

  dispatch({ type: 'RECEIVE_LINK', link: result.get('links').first(), bundleId })
  dispatch({ type: 'RECEIVE_USER', user: result.get('users').first() })
  dispatch(clearCurrentLink(bundleId))
}

export const removeLink = (id, bundleId) => async dispatch =>  {
  let { data } = await request.delete(api.link(id))
  dispatch({ type: 'REMOVE_LINK', id, bundleId })
}
