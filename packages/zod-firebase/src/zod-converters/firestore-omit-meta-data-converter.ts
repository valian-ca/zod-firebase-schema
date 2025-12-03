import {
  type DocumentData,
  type FirestoreDataConverter,
  type SnapshotMetadata,
  type WithFieldValue,
} from '@firebase/firestore'

export type WithFieldValueAndMetadata<T extends DocumentData = DocumentData> = WithFieldValue<T> & {
  readonly _id?: string
  readonly _metadata?: SnapshotMetadata
}

const omitMetadata = <
  AppModelType extends DocumentData = DocumentData,
  DbModelType extends DocumentData = DocumentData,
>({
  _id,
  _metadata,
  ...rest
}: WithFieldValueAndMetadata<AppModelType>) => rest as WithFieldValue<DbModelType>

export const firestoreOmitMetaDataConverter = <
  AppModelType extends DocumentData = DocumentData,
  DbModelType extends DocumentData = DocumentData,
>(): FirestoreDataConverter<AppModelType, DbModelType> => ({
  toFirestore: (modelObject) =>
    omitMetadata<AppModelType, DbModelType>(modelObject as WithFieldValueAndMetadata<AppModelType>),
  fromFirestore: (snapshot) => snapshot.data() as AppModelType,
})
