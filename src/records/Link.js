import { Record } from 'immutable'

const LinkRecord = Record({
  id: null,
  title: null,
  description: null,
  url: null,
  image: null,
  creator: null,
  position: null,
  completed: null,
  created_at: null
})

export default class Link extends LinkRecord {
  canRemove (userId) {
    return this.creator == userId
  }
}
