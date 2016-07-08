import { browserHistory } from 'react-router'
import { fromJS, Map } from 'immutable'
import { normalize, arrayOf } from 'normalizr'
import * as Schemas from 'normalizers'
import { Bundle, Collection, User, Link, Share } from 'records'


export const urlDomain = str => {
  const url = document.createElement('a')

  url.href = str
  return url.hostname
}

export const shouldShow = show => ({
  'display': show ? 'block' : 'none'
})

export const shouldAppear = appear => ({
  'opacity': appear ? 1 : 0
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
  let result = fromJS(normalize(data, Schemas.bundle).entities)
    .update('users', users => users || Map())
    .update('links', links => links || Map())
    .update('shares', shares => shares || Map())
    .update('bundles', bundles => bundles || Map())

    const bundle = new Bundle(result.get('bundles').first())
    const users = result.get('users').valueSeq().map(item => new User(item))
    const links = result.get('links').valueSeq().map(item => new Link(item))
    const shares = result.get('shares').valueSeq().map(item => new Share(item))

  dispatch({ type: 'RECEIVE_USERS',  users })
  dispatch({ type: 'RECEIVE_LINKS',  links })
  dispatch({ type: 'RECEIVE_SHARES', shares })
  dispatch({ type: 'SAVE_BUNDLE', bundle })

  if (oldId && bundle.id !== oldId) {
    dispatch({ type: 'REMOVE_BUNDLE', id: oldId })
    browserHistory.push(`/bundle/${bundle.id}`)
  }
}

export const reduceBundles = (data, dispatch) => {
  let result = fromJS(normalize(data, arrayOf(Schemas.bundle)).entities)
    .update('bundles', bundles => bundles || Map())
  let bundles = result.get('bundles').valueSeq().map(item => new Bundle(item))

  dispatch({ type: 'RECEIVE_BUNDLES', bundles })
}

export const reduceCollection = (data, dispatch) => {
  let result = fromJS(normalize(data, Schemas.collection).entities)
    .update('users', users => users || Map())
    .update('shares', shares => shares || Map())
    .update('bundles', bundles => bundles || Map())
    .update('collections', collections => collections || Map())


  let collection = new Bundle(result.get('collections').first())
  let users = result.get('users').valueSeq().map(item => new User(item))
  let shares = result.get('shares').valueSeq().map(item => new Share(item))
  let bundles = result.get('bundles').valueSeq().map(item => new Bundle(item))

  dispatch({ type: 'RECEIVE_USERS',  users })
  dispatch({ type: 'RECEIVE_SHARES', shares })
  dispatch({ type: 'RECEIVE_BUNDLES', bundles })
  dispatch({ type: 'RECEIVE_COLLECTION', collection })
}

export const reduceCollections = (data, dispatch) => {
  let result = fromJS(normalize(data, arrayOf(Schemas.collection)).entities)
    .update('users', users => users || Map())
    .update('shares', shares => shares || Map())
    .update('bundles', bundles => bundles || Map())
    .update('collections', collections => collections || Map())


  let users = result.get('users').valueSeq().map(item => new User(item))
  let shares = result.get('shares').valueSeq().map(item => new Share(item))
  let bundles = result.get('bundles').valueSeq().map(item => new Bundle(item))
  let collections = result.get('collections').valueSeq().map(item => new Collection(item))

  dispatch({ type: 'RECEIVE_USERS',  users })
  dispatch({ type: 'RECEIVE_SHARES', shares })
  dispatch({ type: 'RECEIVE_BUNDLES', bundles })
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

export const bestThumbnail = (data) => {
  if (data.thumbnail && data.thumbnail.url) {
    return data.thumbnail.url
  } else if (data.image && data.image.url) {
    return data.image.url
  } else if (data.icon && data.icon.any) {
    return data.icon.any
  } else if (data.embed && data.embed.type === 'photo' && data.embed.url) {
    return data.embed.url
  } else {
    return 'no image' // TODO default image url
  }
}
