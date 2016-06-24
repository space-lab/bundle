import { bestThumbnail } from 'helpers'
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

export const updateLink = (id, field, value) => ({
  type: 'UPDATE_LINK', id, field, value
})
