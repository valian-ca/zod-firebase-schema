import { type PartialWithFieldValue, type SetOptions, type UpdateData, type WithFieldValue } from '@firebase/firestore'
import { type Except } from 'type-fest'

import {
  type CollectionSchema,
  type SchemaDocumentInput,
  type SchemaDocumentOutput,
  type SchemaFirestoreFactory,
  type SchemaFirestoreReadFactory,
  type SchemaFirestoreWriteFactory,
  type SchemaReadDocumentReference,
  type SchemaWriteDocumentReference,
} from '../../schema'
import { type MetaOutputOptions } from '../../zod-converters'

import {
  multiDocumentCollectionFactory,
  type SchemaFallbackOutputDocument,
  type SchemaFallbackValue,
} from './multi-document-collection-factory'

export interface SingleDocumentCollectionFactory<TCollectionSchema extends CollectionSchema> {
  readonly singleDocumentKey: string

  readonly read: Except<SchemaFirestoreReadFactory<TCollectionSchema>, 'doc'> & {
    doc<TOptions extends MetaOutputOptions>(
      this: void,
      options?: TOptions,
    ): SchemaReadDocumentReference<TCollectionSchema, TOptions>
  }

  readonly write: Except<SchemaFirestoreWriteFactory<TCollectionSchema>, 'doc'> & {
    doc(this: void): SchemaWriteDocumentReference<TCollectionSchema>
  }

  find<TOptions extends MetaOutputOptions>(
    this: void,
    options?: TOptions,
  ): Promise<SchemaDocumentOutput<TCollectionSchema, TOptions> | undefined>

  findOrThrow<TOptions extends MetaOutputOptions>(
    this: void,
    options?: TOptions,
  ): Promise<SchemaDocumentOutput<TCollectionSchema, TOptions>>

  findWithFallback(
    this: void,
    fallback: SchemaFallbackValue<TCollectionSchema>,
  ): Promise<SchemaFallbackOutputDocument<TCollectionSchema>>

  set(this: void, data: WithFieldValue<SchemaDocumentInput<TCollectionSchema>>): Promise<void>

  set(
    this: void,
    data: PartialWithFieldValue<SchemaDocumentInput<TCollectionSchema>>,
    options: SetOptions,
  ): Promise<void>

  update(this: void, data: UpdateData<SchemaDocumentInput<TCollectionSchema>>): Promise<void>

  delete(this: void): Promise<void>
}

export const singleDocumentCollectionFactory = <TCollectionSchema extends CollectionSchema>(
  firestoreFactory: SchemaFirestoreFactory<TCollectionSchema>,
  schema: TCollectionSchema,
  singleDocumentKey: string,
): SingleDocumentCollectionFactory<TCollectionSchema> => {
  const {
    read,
    write,
    findById,
    findByIdOrThrow,
    findByIdWithFallback,
    set,
    update,
    delete: deleteDocument,
    ...rest
  } = multiDocumentCollectionFactory(firestoreFactory, schema)

  return {
    ...rest,
    singleDocumentKey,
    read: {
      ...read,
      doc: <TOptions extends MetaOutputOptions>(options?: TOptions) => read.doc<TOptions>(singleDocumentKey, options),
    },
    find: <TOptions extends MetaOutputOptions>(options?: TOptions) => findById(singleDocumentKey, options),
    findOrThrow: <TOptions extends MetaOutputOptions>(options?: TOptions) =>
      findByIdOrThrow(singleDocumentKey, options),
    findWithFallback: (fallback) => findByIdWithFallback(singleDocumentKey, fallback),
    write: {
      ...write,
      doc: () => write.doc(singleDocumentKey),
    },
    set: (data: PartialWithFieldValue<SchemaDocumentInput<TCollectionSchema>>, setOptions?: SetOptions) =>
      setOptions
        ? set(singleDocumentKey, data, setOptions)
        : set(singleDocumentKey, data as WithFieldValue<SchemaDocumentInput<TCollectionSchema>>),
    update: (data) => update(singleDocumentKey, data),
    delete: () => deleteDocument(singleDocumentKey),
  }
}
