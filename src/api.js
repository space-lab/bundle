import { API_BASE, FETCHER_URL } from 'constants'

export default {
  bundles: (id = '') => `${API_BASE}/bundles/${id}`,
  collections: (id = '') => `${API_BASE}/collections/${id}`,
  shares: (id = '') => `${API_BASE}/shares/${id}`,
  invites: (id = '') => `${API_BASE}/invites/${id}`,
  searchResource: (query) => `${API_BASE}/search/resource?q=${query}`,
  searchUsers: (query) => `${API_BASE}/search/user?q=${query}`,
  favorite: (resource, id) => `${API_BASE}/${resource}/${id}/favorite`,
  favorites: () => `${API_BASE}/favorites`,
  fetchLink: (url) => FETCHER_URL + url,
  me: () => `${API_BASE}/me`,
  auth: (provider) => `${API_BASE}/auth/${provider}`,
  invite: (resource, id) => `${API_BASE}/${resource}/${id}/invite`,
}
