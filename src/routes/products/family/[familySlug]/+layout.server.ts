import api from '$lib/helpers/api';
import chain from '$lib/helpers/chain';
import type { LayoutServerLoad } from './$types';
import type { Product } from '$lib/types';

export const load: LayoutServerLoad = async ({ parent, params }) => {
  await parent();

  const { familySlug } = params;

  const includes = [
    'main-family',
    'sub-family',
    'uses',
    'qualities',
    'product-uses',
    'product-qualities'
  ].join(',');

  const [products] = await Promise.all([
    api.get<Product[]>(`/v1/public/products?filter[main_family]=${familySlug}&include=${includes}`)
  ]);
  const family = chain(products).mapBy('mainFamily').filterBy('id', familySlug).first();

  return { products, family };
};
