import {
  type CollectionReference,
  type DocumentData,
  type DocumentReference,
  type DocumentSnapshot,
  type Query,
  type QuerySnapshot,
  type SnapshotMetadata,
} from '@firebase/firestore'
import { type EmptyObject, type ReadonlyDeep } from 'type-fest'
import type * as z from 'zod'

type ZodSimpleDocumentData<Output extends DocumentData = DocumentData, Input extends DocumentData = Output> = z.ZodType<
  Output,
  Input
>

export type ZodTypeDocumentData<Output extends DocumentData = DocumentData, Input extends DocumentData = Output> =
  | ZodSimpleDocumentData<Output, Input>
  | z.ZodUnion<readonly [ZodSimpleDocumentData<Output, Input>, ...Array<ZodSimpleDocumentData<Output, Input>>]>

export type DocumentInput<Z extends ZodTypeDocumentData = ZodTypeDocumentData> = z.input<Z>

export interface MetaOutputOptions {
  readonly _id?: boolean
  readonly _metadata?: true
  readonly readonly?: true
}

export type MetaOutput<TOptions extends MetaOutputOptions> = (TOptions extends { _id: false }
  ? EmptyObject
  : { readonly _id: string }) &
  (TOptions extends { _metadata: true } ? { readonly _metadata: SnapshotMetadata } : EmptyObject)

export type DocumentOutput<
  Z extends ZodTypeDocumentData,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
> = (TOptions extends { readonly: true } ? ReadonlyDeep<z.output<Z>> : z.output<Z>) & MetaOutput<TOptions>

export type ReadonlyDocumentOutput<
  Z extends ZodTypeDocumentData,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
> = ReadonlyDeep<z.output<Z>> & MetaOutput<TOptions>

export type ZodDocumentReference<
  Z extends ZodTypeDocumentData,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
  AppModelType extends DocumentOutput<Z, TOptions> = DocumentOutput<Z, TOptions>,
  DbModelType extends DocumentData = DocumentInput<Z>,
> = DocumentReference<AppModelType, DbModelType>

export type ZodDocumentSnapshot<
  Z extends ZodTypeDocumentData,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
  AppModelType extends DocumentOutput<Z, TOptions> = DocumentOutput<Z, TOptions>,
  DbModelType extends DocumentData = DocumentInput<Z>,
> = DocumentSnapshot<AppModelType, DbModelType>

export type ZodCollectionReference<
  Z extends ZodTypeDocumentData,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
  AppModelType extends DocumentOutput<Z, TOptions> = DocumentOutput<Z, TOptions>,
  DbModelType extends DocumentData = DocumentInput<Z>,
> = CollectionReference<AppModelType, DbModelType>

export type ZodQuery<
  Z extends ZodTypeDocumentData,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
  AppModelType extends DocumentOutput<Z, TOptions> = DocumentOutput<Z, TOptions>,
  DbModelType extends DocumentData = DocumentInput<Z>,
> = Query<AppModelType, DbModelType>

export type ZodQuerySnapshot<
  Z extends ZodTypeDocumentData,
  TOptions extends MetaOutputOptions = MetaOutputOptions,
  AppModelType extends DocumentOutput<Z, TOptions> = DocumentOutput<Z, TOptions>,
  DbModelType extends DocumentData = DocumentInput<Z>,
> = QuerySnapshot<AppModelType, DbModelType>
