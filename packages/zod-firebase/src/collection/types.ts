import { type ConditionalKeys, type ConditionalPick } from 'type-fest'

import { type CollectionSchema, type Schema, type SchemaFirestoreQueryFactory } from '../schema'

import { type CollectionFactory } from './factory'

export type Collections<TSchema extends object> = {
  [CollectionName in ConditionalKeys<TSchema, CollectionSchema>]: TSchema[CollectionName] &
    Collection<CollectionName, TSchema[CollectionName]>
}

export type SubCollections<TSchema extends object> = {
  [CollectionName in ConditionalKeys<TSchema, CollectionSchema>]: TSchema[CollectionName] &
    SubCollection<CollectionName, TSchema[CollectionName]>
}

export type SubCollectionsAccessor<TSchema extends Schema> = (documentId: string) => Collections<TSchema>

export type Collection<TCollectionName extends string, TCollectionSchema extends CollectionSchema> = CollectionFactory<
  TCollectionName,
  TCollectionSchema
> &
  SubCollections<TCollectionSchema> &
  SubCollectionsAccessor<ConditionalPick<TCollectionSchema, CollectionSchema>>

export type SubCollection<
  TCollectionName extends string,
  TCollectionSchema extends CollectionSchema,
> = TCollectionSchema & {
  readonly collectionName: TCollectionName
  readonly group: SchemaFirestoreQueryFactory<TCollectionSchema>
} & SubCollections<TCollectionSchema>
