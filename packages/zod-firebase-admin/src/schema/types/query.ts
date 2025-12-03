import {
  type DocumentSnapshot,
  type Query,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
} from 'firebase-admin/firestore'

import { type QuerySpecification } from '../../query'
import { type MetaOutputOptions } from '../../zod-converters'

import { type SchemaDocumentInput, type SchemaDocumentOutput } from './doc'
import { type CollectionSchema } from './schema'

export type SchemaQuery<
  TCollectionSchema extends CollectionSchema,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
> = Query<SchemaDocumentOutput<TCollectionSchema, TOptions>, SchemaDocumentInput<TCollectionSchema>>

export type SchemaQuerySnapshot<
  TCollectionSchema extends CollectionSchema,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
> = QuerySnapshot<SchemaDocumentOutput<TCollectionSchema, TOptions>, SchemaDocumentInput<TCollectionSchema>>

export type SchemaDocumentSnapshot<
  TCollectionSchema extends CollectionSchema,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
> = DocumentSnapshot<SchemaDocumentOutput<TCollectionSchema, TOptions>, SchemaDocumentInput<TCollectionSchema>>

export type SchemaQueryDocumentSnapshot<
  TCollectionSchema extends CollectionSchema,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
> = QueryDocumentSnapshot<SchemaDocumentOutput<TCollectionSchema, TOptions>, SchemaDocumentInput<TCollectionSchema>>

export type SchemaQuerySpecification<
  TCollectionSchema extends CollectionSchema,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
> = QuerySpecification<SchemaDocumentOutput<TCollectionSchema, TOptions>, SchemaDocumentInput<TCollectionSchema>>

export interface SchemaFirestoreQueryFactory<TCollectionSchema extends CollectionSchema> {
  readonly collectionName: string

  prepare<TOptions extends MetaOutputOptions>(
    query: SchemaQuerySpecification<TCollectionSchema, TOptions>,
    options?: TOptions,
  ): SchemaQuery<TCollectionSchema, TOptions>

  query<TOptions extends MetaOutputOptions>(
    query: SchemaQuerySpecification<TCollectionSchema, TOptions>,
    options?: TOptions,
  ): Promise<SchemaQuerySnapshot<TCollectionSchema, TOptions>>

  count(query: SchemaQuerySpecification<TCollectionSchema>): Promise<number>

  findMany<TOptions extends MetaOutputOptions>(
    query: SchemaQuerySpecification<TCollectionSchema, TOptions>,
    options?: TOptions,
  ): Promise<Array<SchemaDocumentOutput<TCollectionSchema, TOptions>>>

  findUnique<TOptions extends MetaOutputOptions>(
    query: SchemaQuerySpecification<TCollectionSchema, TOptions>,
    options?: TOptions,
  ): Promise<SchemaDocumentOutput<TCollectionSchema, TOptions> | null>

  findUniqueOrThrow<TOptions extends MetaOutputOptions>(
    query: SchemaQuerySpecification<TCollectionSchema, TOptions>,
    options?: TOptions,
  ): Promise<SchemaDocumentOutput<TCollectionSchema, TOptions>>

  findFirst<TOptions extends MetaOutputOptions>(
    query: SchemaQuerySpecification<TCollectionSchema, TOptions>,
    options?: TOptions,
  ): Promise<SchemaDocumentOutput<TCollectionSchema, TOptions> | null>

  findFirstOrThrow<TOptions extends MetaOutputOptions>(
    query: SchemaQuerySpecification<TCollectionSchema, TOptions>,
    options?: TOptions,
  ): Promise<SchemaDocumentOutput<TCollectionSchema, TOptions>>
}
