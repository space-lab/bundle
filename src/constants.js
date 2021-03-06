export const SHARE_PERMISSIONS = [
  { id: 1, name: 'View' },
  { id: 2, name: 'Edit' }
]

export const FETCHER_URL = 'http://services.spacelab.team/fetcher?url='
export const API_BASE = process.env.NODE_ENV === 'production'
  ? 'http://bundle.spacelab.team/api'
  : 'http://localhost:3000/api'
