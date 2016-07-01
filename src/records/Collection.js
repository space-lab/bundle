import { Record, List } from 'immutable'

const CollectionRecord = Record({
  id: null,
  name: '',
  bundles_count: 0,
  shares_count: 0,
  favorites_count: 0,
  creator: null,
  favorited: false,
  bundles: List(),
  shares: List(),
  full_response: false,
  created_at: null,
  editMode: false,
  type: null,
  share_url: null,
  share_url_permission: null
})

export default class Collection extends CollectionRecord {
  canRemove (userId) {
    return this.creator == userId
  }

  canShare (userId) {
    return this.creator == userId
  }

  canEdit (userId) {
    return this.creator == userId || this.shares.some(share => {
      return share.user.id === userId && share.permission.name === 'Edit'
    })
  }
}
