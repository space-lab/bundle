import { Schema, arrayOf } from 'normalizr'

export const collectionSchema = new Schema('collections', { idAttribute: 'id' })
export const bundleSchema = new Schema('bundles', { idAttribute: 'id' })
export const userSchema = new Schema('users', { idAttribute: 'id' })
export const linkSchema = new Schema('links', { idAttribute: 'id' })
export const shareSchema = new Schema('shares', { idAttribute: 'id' })


collectionSchema.define({
  creator: userSchema,
  bundles: arrayOf(bundleSchema),
  shares: arrayOf(shareSchema)
})

bundleSchema.define({
  creator: userSchema,
  links: arrayOf(linkSchema),
  shares: arrayOf(shareSchema)
})

linkSchema.define({
  creator: userSchema
})

shareSchema.define({
  user: userSchema
})
