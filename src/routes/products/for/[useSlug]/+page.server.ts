import api from '$lib/helpers/api';
import type { PageServerLoad } from './$types';
import type { Use, Product } from '$lib/types';

export const load: PageServerLoad = async ({ parent, params }) => {
  await parent();

  const { useSlug } = params;

  const [use] = await Promise.all([
    api.get<Use>(
      `/v1/public/uses/${useSlug}?include=products,products.uses,products.main-family,products.sub-family`
    )
  ]);

  const products: Product[] = use.products || [];

  return { products, use };
};
