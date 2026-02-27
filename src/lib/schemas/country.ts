import { type } from 'arktype';

export const country = type({
  id: 'string',
  nameEnglish: 'string',
  nameNative: 'string'
});

export type Country = typeof country.infer;
