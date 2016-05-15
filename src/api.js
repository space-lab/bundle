import { API_BASE, FETCHER_URL } from './constants'

let paths = {
  bundles: (id = '') => `${API_BASE}/bundles/${id}`,
  collections: (id = '') => `${API_BASE}/collections/${id}`,
  shares: (id = '') => `${API_BASE}/shares/${id}`,
  searchResource: (query) => `${API_BASE}/search/resource?q=${query}`,
  favorite: (resource, id) => `${API_BASE}/${resource}/${id}/favorite`,
  favorites: () => `${API_BASE}/favorites`,
  fetchLink: (url) => FETCHER_URL + url,
  me: () => `${API_BASE}/me`,
  invite: (resource, id) => `${API_BASE}/${resource}/${id}/invite`,
}

export default paths
