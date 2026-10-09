import api from '$lib/helpers/api';
import type { PageServerLoad } from './$types';
import type { Use, Product } from '$lib/types';

export const load: PageServerLoad = async ({ parent, params }) => {
  await parent();

  const { useSlug } = params;

  const includes = [
    'products',
    'products.main-family',
    'products.sub-family',
    'products.uses',
    'products.qualities',
    'products.product-uses',
    'products.product-qualities'
  ].join(',');

  const [use] = await Promise.all([api.get<Use>(`/v1/public/uses/${useSlug}?include=${includes}`)]);

  const products: Product[] = use.products || [];

  return { products, use };
};
