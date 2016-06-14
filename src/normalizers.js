import { Schema, arrayOf } from 'normalizr-immutable'
import * as records from 'records'

export const bundle = new Schema('bundles', records.Bundle)
export const collection = new Schema('collections', records.Collection)
export const user = new Schema('users', records.User)
export const link = new Schema('links', records.Link)
export const share = new Schema('shares', records.Share)

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
