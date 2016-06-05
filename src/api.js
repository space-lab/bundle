import { API_BASE, FETCHER_URL } from 'constants'

export default {
  auth: (provider) => `${API_BASE}/auth/${provider}`,

  me: () => `${API_BASE}/users/me`,
  user: (id) => `${API_BASE}/users/${id}`,

  bundles: (id = '') => `${API_BASE}/bundles/${id}`,
  collections: (id = '') => `${API_BASE}/collections/${id}`,

  shares: (id = '') => `${API_BASE}/shares/${id}`,
  invites: (id = '') => `${API_BASE}/invites/${id}`,

  invite: (resource, id) => `${API_BASE}/${resource}/${id}/invite`,

  searchResource: (query) => `${API_BASE}/search/resource?q=${query}`,
  searchUsers: (query) => `${API_BASE}/search/users?q=${query}`,

  favorite: (resource, id) => `${API_BASE}/${resource}/${id}/favorite`,
  favorites: () => `${API_BASE}/favorites`,

  fetchLink: (url) => FETCHER_URL + url
}
