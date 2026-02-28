import { type } from 'arktype';

export const DocumentCategory = type({
  id: 'string'
});

export type DocumentCategory = typeof DocumentCategory.infer;
