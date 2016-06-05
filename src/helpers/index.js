import { fromJS, Map, List } from 'immutable'
import { normalize, arrayOf } from 'normalizr'

import { Bundle, Collection, User, Link, Share } from 'records'
import { bundleSchema, collectionSchema } from 'normalizers'

export const urlDomain = str => {
  const url = document.createElement('a')

  url.href = str
  return url.hostname
}

export const shouldShow = show => ({
  'display': show ? 'block' : 'none'
})

export const linksWithoutAuthors = links => {
  return links.map(link => link.delete('creator'))
}

export const nextId = items => {
  let max = items.keySeq().filter(id => id < 0).max() || 0
  return (max - 1).toString()
}

export const reduceBundle = (data, dispatch) => {
  let result = fromJS(normalize(data, bundleSchema).entities)
    .update('links', links => links || Map())
    .update('shares', shares => shares || Map())

  let bundle = new Bundle(result.get('bundles').first())
  let users = result.get('users').valueSeq().map(item => new User(item))
  let links = result.get('links').valueSeq().map(item => new Link(item))
  let shares = result.get('shares').valueSeq().map(item => new Share(item))

  dispatch({ type: 'RECEIVE_USERS', users })
  dispatch({ type: 'RECEIVE_LINKS', links })
  dispatch({ type: 'RECEIVE_SHARES', shares })
  dispatch({ type: 'SAVE_BUNDLE', bundle })
}

export const reduceCollection = (data, dispatch, isArray) => {
  let schema = isArray ? arrayOf(collectionSchema) : collectionSchema
  let result = fromJS(normalize(data, schema).entities)
    .update('users', links => links || Map())
    .update('shares', shares => shares || Map())
    .update('bundles', shares => shares || Map())

  let users = result.get('users').valueSeq().map(item => new User(item))
  let shares = result.get('shares').valueSeq().map(item => new Share(item))
  let bundles = result.get('bundles').valueSeq().map(item => new Bundle(item))
  let collections = result.get('collections').valueSeq().map(item => new Collection(item))

  dispatch({ type: 'RECEIVE_USERS', users })
  dispatch({ type: 'RECEIVE_SHARES', shares })
  dispatch({ type: 'RECEIVE_BUNDLES', bundles })
  dispatch({ type: 'RECEIVE_COLLECTIONS', collections })
  dispatch({ type: 'ALL_COLLECTIONS_RECEIVED' })
}
