import { type } from 'arktype';
import { DocumentCategory } from './DocumentCategory.ts';

export const Document = type({
  id: 'string',
  name: 'string',
  path: 'string',
  variations: 'string',
  'document-category': DocumentCategory
});

export type Document = typeof Document.infer;
