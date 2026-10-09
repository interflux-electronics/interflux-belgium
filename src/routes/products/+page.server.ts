import { api } from '$lib/helpers/api';
import type { PageServerLoad } from './$types';
import type { Product } from '$lib/types';

export const load: PageServerLoad = async ({ parent, fetch }) => {
  await parent();

  const includes = [
    'main-family',
    'sub-family',
    'uses',
    'qualities',
    'product-uses',
    'product-qualities'
  ].join(',');

  const [products] = await Promise.all([
    api(fetch).get<Product[]>(`/v1/public/products?include=${includes}`)
  ]);

  return { products };
};
