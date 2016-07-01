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
    let result = this.creator == userId

    this.shares.forEach(share => {
      if (share.user.id === userId && share.permission.name === 'Edit') {
        result = true
      }
    })

    return result
  }

  canChangeCollection (userId) {
    return this.creator == userId
  }
}
