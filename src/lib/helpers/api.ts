import { getJson } from './getJson.ts';
import { normalizeJsonApi } from './normalizeJsonApi.ts';

export default {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(`/api${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json'
      }
    });
    const body = await getJson(response);
    return normalizeJsonApi<T>(body);
  }
};
