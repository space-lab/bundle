import { API_BASE, FETCHER_URL } from 'constants'

export default {
  auth: (provider) => `${API_BASE}/auth/${provider}`,

  me: () => `${API_BASE}/users/me`,
  user: (id) => `${API_BASE}/users/${id}`,

  bundle: (id = '') => `${API_BASE}/bundles/${id}`,
  bundles: (page = 1) => `${API_BASE}/bundles?page=${page}`,
  collections: (id = '') => `${API_BASE}/collections/${id}`,

  shares: (id = '') => `${API_BASE}/shares/${id}`,
  invites: (id = '') => `${API_BASE}/invites/${id}`,

  invite: (resource, id) => `${API_BASE}/${resource}/${id}/invite`,

  searchResource: (query) => `${API_BASE}/search/resource?q=${query}`,
  searchUsers: (query) => `${API_BASE}/search/users?q=${query}`,

  favorite: (resource, id) => `${API_BASE}/${resource}/${id}/favorite`,
  favorites: () => `${API_BASE}/favorites`,

  urlShare: (resource, id) => `${API_BASE}/${resource}/${id}/url-share`,
  joinUrlShare: (resource, id) => `${API_BASE}/${resource}/${id}/join`,
  urlShareResource: (resource, id, token) => `${API_BASE}/url-shares/${resource}/${id}/${token}`,

  link: (id = '') => `${API_BASE}/links/${id}`,
  toggleCompleteLink: id => `${API_BASE}/links/${id}/toggle_completed`,
  reorderLinks: bundleId => `${API_BASE}/bundles/${bundleId}/reorder_links`,

  fetchLink: (url) => FETCHER_URL + url
}
