import { browserHistory } from 'react-router'
import { fromJS, Map } from 'immutable'
import { normalize, arrayOf } from 'normalizr-immutable'
import * as Schemas from 'normalizers'

export const urlDomain = str => {
  const url = document.createElement('a')

  url.href = str
  return url.hostname
}

export const shouldShow = show => ({
  'display': show ? 'block' : 'none'
})

export const linksWithoutAuthors = links =>
  links.map(link => link.delete('creator'))

export const linksWithAuthorIds = links =>
  links.map(link =>
    link.toMap().set('creator_id', link.get('creator')).remove('creator'))

export const nextId = items => {
  const max = items.keySeq().filter(id => id < 0).max() || 0
  return (max - 1).toString()
}

export const getRecord = (Model, data) => new Model(fromJS(data))

export const getRecords = (Model, data) =>
  fromJS(data).map(item => new Model(item))

export const reduceBundle = (data, oldId, dispatch) => {
  const { entities } = normalize(data, Schemas.bundle)
  const bundle = entities.get('bundles').first()

  dispatch({ type: 'RECEIVE_USERS',  users:  entities.get('users',  new Map()).toList() })
  dispatch({ type: 'RECEIVE_LINKS',  links:  entities.get('links',  new Map()).toList() })
  dispatch({ type: 'RECEIVE_SHARES', shares: entities.get('shares', new Map()).toList() })
  dispatch({ type: 'SAVE_BUNDLE', bundle })

  if (oldId && bundle.id !== oldId) {
    dispatch({ type: 'REMOVE_BUNDLE', id: oldId })
    browserHistory.push(`/bundle/${bundle.id}`)
  }
}

export const reduceBundles = (data, dispatch) => {
  const { entities } = normalize(data, arrayOf(Schemas.bundle))
  const bundles = entities.get('bundles', new Map()).toList()

  dispatch({ type: 'RECEIVE_BUNDLES', bundles })
}

export const reduceCollection = (data, dispatch) => {
  const { entities } = normalize(data, Schemas.collection)
  const collection = entities.get('collections').first()

  dispatch({ type: 'RECEIVE_SHARES', shares: entities.get('shares', new Map()).toList() })
  dispatch({ type: 'RECEIVE_BUNDLES', bundles: entities.get('bundles', new Map()).toList() })
  dispatch({ type: 'RECEIVE_COLLECTION', collection })
}

export const reduceCollections = (data, dispatch) => {
  const { entities } = normalize(data, arrayOf(Schemas.collection))
  const collections = entities.get('collections', new Map()).toList()

  dispatch({ type: 'RECEIVE_COLLECTIONS', collections })
  dispatch({ type: 'ALL_COLLECTIONS_RECEIVED' })
}

export const unNormaliseResources = (data, resources, shares, users) => {
  return data
    .map(id => resources.get(id))
    .filter(Boolean)
    .sortBy(resource => resource.created_at)
    .reverse()
    .toList()
    .map(resource => resource.update('shares', ids => ids.map(id => {
      return shares.get(id).update('user', id => users.get(id))
    })))
}
