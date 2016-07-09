import { normalize } from 'normalizr'
import { fromJS, Map } from 'immutable'
import { bestThumbnail } from 'helpers'
import * as Schemas from 'normalizers'
import { Link, User } from 'records'
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

export const addLink = (linkdata, bundleId) => async dispatch =>  {
  let payload = linkdata.toMap().set('bundle_id', bundleId).toJS()
  let { data } = await request.post(api.link(), payload)
  let result = fromJS(normalize(data, Schemas.link).entities)

  let link = new Link(result.get('links').first())
  let user = new User(result.get('users').first())

  dispatch({ type: 'RECEIVE_LINK', link, bundleId })
  dispatch({ type: 'RECEIVE_USER', user })
  dispatch(clearCurrentLink(bundleId))
}

export const removeLink = (id, bundleId) => async dispatch =>  {
  let { data } = await request.delete(api.link(id))
  dispatch({ type: 'REMOVE_LINK', id, bundleId })
}
