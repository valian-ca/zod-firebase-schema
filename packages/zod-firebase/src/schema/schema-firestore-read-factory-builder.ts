import { type CollectionPath, firestoreCollection, firestoreCollectionGroup, firestoreDocument } from '../primitive'
import { type MetaOutputOptions } from '../zod-converters'

import { schemaFirestoreQueryFactory } from './schema-firestore-query-factory'
import {
  type SchemaFirestoreDataConverter,
  schemaFirestoreZodDataConverterFactory,
} from './schema-firestore-zod-data-converter-factory'
import {
  type CollectionSchema,
  type FirestoreZodFactoryOptions,
  type SchemaFirestoreQueryFactory,
  type SchemaFirestoreReadFactory,
} from './types'

export interface SchemaFirestoreReadFactoryBuilder<TCollectionSchema extends CollectionSchema> {
  build(this: void, parentPath?: [string, string]): SchemaFirestoreReadFactory<TCollectionSchema>

  zodConverter<TOptions extends MetaOutputOptions>(
    this: void,
    options?: TOptions,
  ): SchemaFirestoreDataConverter<TCollectionSchema, TOptions>

  group: SchemaFirestoreQueryFactory<TCollectionSchema>
}

export const schemaFirestoreReadFactoryBuilder = <TCollectionSchema extends CollectionSchema>(
  collectionName: string,
  schema: TCollectionSchema,
  { getFirestore, ...converterOptions }: FirestoreZodFactoryOptions = {},
): SchemaFirestoreReadFactoryBuilder<TCollectionSchema> => {
  const zodConverterFactory = schemaFirestoreZodDataConverterFactory(schema, converterOptions)
  const collectionGroup = <TOptions extends MetaOutputOptions>(options?: TOptions) =>
    firestoreCollectionGroup(collectionName, getFirestore?.()).withConverter(zodConverterFactory(options))
  const build = (parentPath?: [string, string]): SchemaFirestoreReadFactory<TCollectionSchema> => {
    const collectionPath: CollectionPath = parentPath ? [...parentPath, collectionName] : [collectionName]

    return {
      collection: <TOptions extends MetaOutputOptions>(options?: TOptions) =>
        firestoreCollection(collectionPath, getFirestore?.()).withConverter(zodConverterFactory(options)),
      doc: <TOptions extends MetaOutputOptions>(id: string, options?: TOptions) =>
        firestoreDocument(collectionPath, id, getFirestore?.()).withConverter(zodConverterFactory(options)),
      collectionGroup,
    }
  }
  return {
    build,
    zodConverter: zodConverterFactory,
    group: schemaFirestoreQueryFactory(collectionGroup, collectionName),
  }
}
