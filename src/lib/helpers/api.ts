import { getJson } from './getJson.ts';
import { normalizeJsonApi } from './normalizeJsonApi.ts';
import { PUBLIC_API_HOST } from '$env/static/public';

export default {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(`${PUBLIC_API_HOST}${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json'
      }
    });
    const body = await getJson(response);
    return normalizeJsonApi<T>(body);
  }
};
