import { type CollectionSchema, type Schema } from '../../schema'
import { type Collection, type Collections } from '../types'

import { type InternalCollectionSchema, type InternalSchemas } from './index'

export const internalCollectionsBuilder = <TSchema extends Schema>(
  internalSchema: InternalSchemas<TSchema>,
  parentPath: [string, string],
) =>
  Object.fromEntries(
    Object.entries<InternalCollectionSchema<string, TSchema[keyof TSchema]>>(internalSchema).map(
      ([collectionName, schemaBuilder]) => [collectionName, internalCollectionBuilder(schemaBuilder, parentPath)],
    ),
  ) as Collections<TSchema>

const internalCollectionBuilder = <TCollectionName extends string, TCollectionSchema extends CollectionSchema>(
  internalCollectionSchema: InternalCollectionSchema<TCollectionName, TCollectionSchema>,
  parentPath: [string, string],
) => {
  const collection = internalCollectionSchema.build(parentPath)

  const { internalSubSchemas } = internalCollectionSchema
  if (Object.keys(internalSubSchemas).length === 0) {
    return collection as Collection<TCollectionName, TCollectionSchema>
  }

  const subCollectionsAccessor = (documentId: string) =>
    internalCollectionsBuilder(internalSubSchemas, [collection.collectionPath, documentId])

  return Object.assign(subCollectionsAccessor, collection, internalSubSchemas) as Collection<
    TCollectionName,
    TCollectionSchema
  >
}
