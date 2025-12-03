import { type ConditionalKeys, type ConditionalPick } from 'type-fest'

import { type CollectionSchema, type FirestoreZodFactoryOptions, type Schema } from '../../schema'
import { type CollectionFactoryBuilder, collectionFactoryBuilder } from '../factory/collection-factory-builder'

export type InternalSchemas<TSchema extends Schema> = {
  [CollectionName in ConditionalKeys<TSchema, CollectionSchema>]: TSchema[CollectionName] &
    InternalCollectionSchema<CollectionName, TSchema[CollectionName]>
}

export type InternalCollectionSchema<
  TCollectionName extends string,
  TCollectionSchema extends CollectionSchema,
> = TCollectionSchema &
  CollectionFactoryBuilder<TCollectionName, TCollectionSchema> & {
    readonly collectionName: TCollectionName
    readonly internalSubSchemas: InternalSchemas<ConditionalPick<TCollectionSchema, CollectionSchema>>
  }

export const internalSchemaBuilder = <TSchema extends Schema>(
  schema: TSchema,
  options?: FirestoreZodFactoryOptions,
): InternalSchemas<TSchema> =>
  Object.fromEntries(
    Object.entries(schema).map(([collectionName, collectionSchema]) => [
      collectionName,
      internalCollectionSchema(collectionName, collectionSchema, options),
    ]),
  ) as unknown as InternalSchemas<TSchema>

const internalCollectionSchema = <TCollectionName extends string, TCollectionSchema extends CollectionSchema>(
  collectionName: TCollectionName,
  collectionSchema: TCollectionSchema,
  options?: FirestoreZodFactoryOptions,
) => {
  const factoryBuilder = collectionFactoryBuilder(collectionName, collectionSchema, options)

  const { zod, singleDocumentKey, includeDocumentIdForZod, readonlyDocuments, ...subSchemas } = collectionSchema
  const internalSubSchemas =
    Object.keys(subSchemas).length === 0 ? subSchemas : internalSchemaBuilder(subSchemas as Schema, options)

  return {
    collectionName,
    zod,
    singleDocumentKey,
    includeDocumentIdForZod,
    readonlyDocuments,
    internalSubSchemas,
    ...internalSubSchemas,
    ...factoryBuilder,
  } as InternalCollectionSchema<TCollectionName, TCollectionSchema>
}
