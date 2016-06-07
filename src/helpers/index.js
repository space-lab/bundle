import { browserHistory } from 'react-router'
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
  const max = items.keySeq().filter(id => id < 0).max() || 0
  return (max - 1).toString()
}

export const getRecord = (Model, data) => new Model(fromJS(data))

export const getRecords = (Model, data) => {
  return fromJS(data).map(item => new Model(item))
}

export const reduceBundle = (data, oldId, dispatch) => {
  const result = fromJS(normalize(data, bundleSchema).entities)
    .update('links', links => links || Map())
    .update('shares', shares => shares || Map())
    .update('users', users => users || Map())

  const bundle = new Bundle(result.get('bundles').first())
  const users = result.get('users').valueSeq().map(item => new User(item))
  const links = result.get('links').valueSeq().map(item => new Link(item))
  const shares = result.get('shares').valueSeq().map(item => new Share(item))

  dispatch({ type: 'RECEIVE_USERS', users })
  dispatch({ type: 'RECEIVE_LINKS', links })
  dispatch({ type: 'RECEIVE_SHARES', shares })
  dispatch({ type: 'SAVE_BUNDLE', bundle })

  if (bundle.id !== oldId) {
    dispatch({ type: 'REMOVE_BUNDLE', id: oldId })
    browserHistory.push(`/bundle/${bundle.id}`)
  }
}

export const reduceCollection = (data, dispatch, isArray) => {
  const schema = isArray ? arrayOf(collectionSchema) : collectionSchema
  const result = fromJS(normalize(data, schema).entities)
    .update('users', links => links || Map())
    .update('shares', shares => shares || Map())
    .update('bundles', shares => shares || Map())
    .update('collections', colls => colls || Map())

  const users = result.get('users').valueSeq().map(item => new User(item))
  const shares = result.get('shares').valueSeq().map(item => new Share(item))
  const bundles = result.get('bundles').valueSeq().map(item => new Bundle(item))
  const collections = result.get('collections').valueSeq().map(item => new Collection(item))

  dispatch({ type: 'RECEIVE_USERS', users })
  dispatch({ type: 'RECEIVE_SHARES', shares })
  dispatch({ type: 'RECEIVE_BUNDLES', bundles })
  dispatch({ type: 'RECEIVE_COLLECTIONS', collections })
  dispatch({ type: 'ALL_COLLECTIONS_RECEIVED' })
}
