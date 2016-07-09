import { Record, List } from 'immutable'

const BundleRecord = Record({
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
  editMode: false,
  created_at: null,
  type: null,
  share_url: null,
  share_url_permission: null,
  joined: false
})

export default class Bundle extends BundleRecord {
  canRemove (userId) {
    return this.creator == userId
  }

  canShare (userId) {
    return this.creator == userId
  }

  canEdit (userId) {
    return this.creator == userId || this.shares.some(share =>
      share.user.id === userId && share.permission.name === 'Edit'
    )
  }

  canChangeCollection (userId) {
    return this.creator == userId
  }
}
