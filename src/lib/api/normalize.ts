import { Jsona } from 'jsona';

const jsona = new Jsona();

export function normalizeJsonApi<T = any>(response: any): T {
  return jsona.deserialize(response) as T;
}
