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
  isNewBundle: null,
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
    return this.shares.reduce((result, share) => {
      return result || (share.user.id === userId && share.permission.name === 'Edit')
    }, this.creator == userId)
  }

  canChangeCollection (userId) {
    return this.creator == userId
  }
}
