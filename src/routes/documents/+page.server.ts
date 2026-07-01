import { PUBLIC_API_HOST as apiHost } from '$env/static/public';
import { normalizeJsonApi, getJson } from '$lib/helpers';
import { getOptions } from '$lib/state/headers.svelte';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  console.log('⛵️ /documents');

  const [documents, products] = await Promise.all([
    fetch(`${apiHost}/v1/public/documents`, getOptions).then(getJson).then(normalizeJsonApi),
    fetch(`${apiHost}/v1/public/products`, getOptions).then(getJson).then(normalizeJsonApi)
  ]);

  console.log('✅ /documents', documents.length, products.length);

  return {
    documents,
    products,
    headerTheme: 'blue overlap' // configured per route
  };
};
