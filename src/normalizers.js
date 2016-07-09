import { Schema, arrayOf } from 'normalizr'

export const bundle = new Schema('bundles', { idAttribute: 'id' })
export const collection = new Schema('collections', { idAttribute: 'id' })
export const user = new Schema('users', { idAttribute: 'id' })
export const link = new Schema('links', { idAttribute: 'id' })
export const share = new Schema('shares', { idAttribute: 'id' })

collection.define({
  creator: user,
  bundles: arrayOf(bundle),
  shares: arrayOf(share)
})

bundle.define({
  creator: user,
  links: arrayOf(link),
  shares: arrayOf(share)
})

link.define({
  creator: user
})

share.define({
  user: user
})
