import { Record, List } from 'immutable'

export const User = Record({
  id: null,
  name: null,
  email: null,
  image: null,
  auth_token: null
})

export const Bundle = Record({
  id: null,
  name: null,
  description: null,
  creator: null,
  collection_id: null,
  links: List(),
  shares: List(),
  links_count: null,
  favorited: null,
  favorites_count: null,
  full_response: false,
  isNewBundle: null,
  editMode: false,
  created_at: null,
  type: null,
  share_url: null,
  share_url_permission: null
})

export const Collection = Record({
  id: null,
  name: '',
  bundles_count: 0,
  shares_count: 0,
  favorites_count: 0,
  creator: null,
  favorited: false,
  bundles: List(),
  shares: List(),
  full_response: false,
  created_at: null,
  editMode: false,
  type: null,
  share_url: null,
  share_url_permission: null
})

export const Link = Record({
  id: null,
  title: null,
  description: null,
  url: null,
  image: null,
  creator: null,
  created_at: null
})

export const Share = Record({
  id: null,
  resource: null,
  user: null,
  permission: null,
  type: null,
  created_at: null
})

export const Route = Record({
  bundleId: null,
  collectionId: null,
  navigationView: 'bundles'
})

export const UserAutocomplete = Record({
  id: null,
  image: null,
  name: null
})
