import { type } from 'arktype';
import { documentCategory } from "$lib/schemas";

export const document = type({
  id: 'string',
  path: 'string',
  variations: 'string',
  documentCategory: documentCategory
});

export type Document = typeof document.infer;
