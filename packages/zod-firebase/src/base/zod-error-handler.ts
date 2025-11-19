import { type DocumentData, type QueryDocumentSnapshot } from '@firebase/firestore'
// eslint-disable-next-line import-x/consistent-type-specifier-style,zod-x/prefer-namespace-import
import type { ZodError } from 'zod'

export type ZodErrorHandler = <T extends DocumentData = DocumentData>(
  zodError: ZodError<T>,
  snapshot: QueryDocumentSnapshot,
) => Error
