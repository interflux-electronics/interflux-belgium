import { PUBLIC_API_HOST } from '$env/static/public';
import { normalizeJsonApi } from '$lib/api/normalize';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const [documents, products] = await Promise.all([
    fetch(`${PUBLIC_API_HOST}/v1/public/documents`)
      .then((r) => {
        if (r.status !== 200) throw new Error('Document fetch failed');
        return r.json();
      })
      .then((json) => {
        return normalizeJsonApi(json);
      }),
      
    fetch(`${PUBLIC_API_HOST}/v1/public/products`)
      .then((r) => {
        if (r.status !== 200) throw new Error('Product fetch failed');
        return r.json();
      })
      .then((json) => {
        return normalizeJsonApi(json);
      })
  ]);

  return {
    documents,
    products,
    theme: 'blue overlap'
  };
};
