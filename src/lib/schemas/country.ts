import { type } from 'arktype';

export const Country = type({
  id: 'string',
  nameEnglish: 'string',
  nameNative: 'string'
});

export type Country = typeof Country.infer;
