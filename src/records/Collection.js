import { Record, List } from 'immutable'

const CollectionRecord = Record({
  id: null,
  slug: null,
  name: '',
  bundles_count: 0,
  shares_count: 0,
  favorites_count: 0,
  creator: null,
  favorited: false,
  bundles: List(),
  shares: List(),
  created_at: null,
  editMode: false,
  type: null,
  share_url: null,
  share_url_permission: null,
  joined: false
})

export default class Collection extends CollectionRecord {
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

  canLeave (userId) {
    return this.joined && this.creator !== userId
  }
}
