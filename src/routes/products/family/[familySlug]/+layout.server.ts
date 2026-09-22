import api from '$lib/helpers/api';
import chain from '$lib/helpers/chain';
import type { LayoutServerLoad } from './$types';
import type { Product } from '$lib/types';

export const load: LayoutServerLoad = async ({ parent, params }) => {
  await parent();

  const { familySlug } = params;
  const [products] = await Promise.all([
    api.get<Product[]>(
      `/v1/public/products?filter[main_family]=${familySlug}&include=main-family,sub-family,uses,product-uses,product-uses.image`
    )
  ]);
  const family = chain(products).mapBy('mainFamily').filterBy('id', familySlug).first();

  return { products, family };
};
