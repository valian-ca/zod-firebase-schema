import {
  type DocumentData,
  type FirestoreDataConverter,
  type Timestamp,
  type WithFieldValue,
} from 'firebase-admin/firestore'

export type WithFieldValueAndMetadata<T extends DocumentData = DocumentData> = WithFieldValue<T> & {
  readonly _id?: string
  readonly _createTime?: Timestamp
  readonly _updateTime?: Timestamp
  readonly _readTime?: Timestamp
}

const omitMetadata = <
  AppModelType extends DocumentData = DocumentData,
  DbModelType extends DocumentData = DocumentData,
>({
  _id,
  _readTime,
  _createTime,
  _updateTime,
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
