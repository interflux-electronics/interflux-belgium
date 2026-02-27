import { type } from 'arktype';

export const documentCategory = type({
  id: 'string',
  name: 'string'
});

export type DocumentCategory = typeof documentCategory.infer;
