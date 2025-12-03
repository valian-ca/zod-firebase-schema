import { type CollectionReference, type DocumentReference, type Query } from '@firebase/firestore'

import { type MetaOutputOptions } from '../../zod-converters'

import { type SchemaDocumentInput, type SchemaDocumentOutput } from './doc'
import { type CollectionSchema } from './schema'

export type SchemaReadCollectionReference<
  TCollectionSchema extends CollectionSchema,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
> = CollectionReference<SchemaDocumentOutput<TCollectionSchema, TOptions>, SchemaDocumentInput<TCollectionSchema>>

export type SchemaReadDocumentReference<
  TCollectionSchema extends CollectionSchema,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
> = DocumentReference<SchemaDocumentOutput<TCollectionSchema, TOptions>, SchemaDocumentInput<TCollectionSchema>>

export type SchemaReadCollectionGroup<
  TCollectionSchema extends CollectionSchema,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
> = Query<SchemaDocumentOutput<TCollectionSchema, TOptions>, SchemaDocumentInput<TCollectionSchema>>

export interface SchemaFirestoreReadFactory<TCollectionSchema extends CollectionSchema> {
  collection<TOptions extends MetaOutputOptions>(
    this: void,
    options?: TOptions,
  ): SchemaReadCollectionReference<TCollectionSchema, TOptions>

  doc<TOptions extends MetaOutputOptions>(
    this: void,
    id: string,
    options?: TOptions,
  ): SchemaReadDocumentReference<TCollectionSchema, TOptions>

  collectionGroup<TOptions extends MetaOutputOptions>(
    this: void,
    options?: TOptions,
  ): SchemaReadCollectionGroup<TCollectionSchema, TOptions>
}
