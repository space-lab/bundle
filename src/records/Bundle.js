import { Record, List } from 'immutable'

const BundleRecord = Record({
  id: null,
  slug: null,
  name: null,
  description: null,
  creator: null,
  collection_id: null,
  collection_name: null,
  links: List(),
  shares: List(),
  links_count: null,
  favorited: null,
  favorites_count: null,
  editMode: false,
  created_at: null,
  updated_at: null,
  type: null,
  share_url: null,
  share_url_permission: null,
  joined: false,
  unlisted: false
})

export default class Bundle extends BundleRecord {
  canRemove (userId) {
    return this.creator === userId && !this.unlisted
  }

  canShare (userId) {
    return this.creator === userId && !this.unlisted
  }

  canEdit (userId) {
    return !this.unlisted && (this.creator === userId || this.shares.some(share =>
      share.user.id === userId && share.permission.get('name') === 'Edit'))
  }

  canChangeCollection (userId) {
    return this.creator === userId && !this.unlisted
  }

  canLeave (userId) {
    return !this.unlisted && (this.shareIdFor(userId) && this.joined && this.creator !== userId) || false
  }

  shareIdFor (userId) {
    let share = this.shares.find(share => share.user.id === userId)
    return share ? share.id : null
  }

  shareTypeFor (userId) {
    let share = this.shares.find(share => share.user.id === userId)
    return share ? share.resource : null
  }
}
