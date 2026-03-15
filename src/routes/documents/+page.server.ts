import { PUBLIC_API_HOST as api } from '$env/static/public';
import { normalizeJsonApi } from '$lib/api/normalize';
import { getOptions } from '$lib/state/headers.svelte';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const getJson = (response: Response) => {
    if (response.status !== 200) {
      throw new Error('Fetch failed');
    }
    return response.json();
  };

  const normalize = (json: any) => {
    return normalizeJsonApi(json);
  };

  const [documents, products] = await Promise.all([
    fetch(`${api}/v1/public/documents`, getOptions).then(getJson).then(normalize),
    fetch(`${api}/v1/public/products`, getOptions).then(getJson).then(normalize)
  ]);

  // TODO?
  // const [documents, products] = await Promise.all([
  //   findAll('documents'),
  //   findAll('products')
  // ]);

  return {
    documents,
    products,
    theme: 'blue overlap' // configured per route
  };
};
