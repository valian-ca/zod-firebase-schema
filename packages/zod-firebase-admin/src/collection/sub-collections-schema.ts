import { type EmptyObject } from 'type-fest'

import { type CollectionSchema, type Schema } from '../schema'

type SubCollectionsSchema<TSchema> =
  Omit<TSchema, 'zod' | 'singleDocumentKey' | 'includeDocumentIdForZod' | 'readonlyDocuments'> extends Schema
    ? Omit<TSchema, 'zod' | 'singleDocumentKey' | 'includeDocumentIdForZod' | 'readonlyDocuments'>
    : EmptyObject

export const subCollectionsSchema = <TCollectionSchema extends CollectionSchema>(
  collectionSchema: TCollectionSchema,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { zod, singleDocumentKey, includeDocumentIdForZod, readonlyDocuments, ...rest } = collectionSchema
  return rest as SubCollectionsSchema<TCollectionSchema>
}
