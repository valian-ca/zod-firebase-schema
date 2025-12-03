import { type DocumentData, type QueryDocumentSnapshot } from 'firebase-admin/firestore'
import type * as z3 from 'zod/v3'
import type * as z4 from 'zod/v4/core'

export type ZodErrorHandler = <T extends DocumentData = DocumentData>(
  zodError: z4.$ZodError<T> | z3.ZodError<T>,
  snapshot: QueryDocumentSnapshot,
) => Error
