import api from '$lib/helpers/api';
import type { PageServerLoad } from './$types';
import type { Product } from '$lib/types';

export const load: PageServerLoad = async ({ parent }) => {
  await parent();

  const [products] = await Promise.all([
    api.get<Product[]>(`/v1/public/products?include=main_family,sub_family,uses`)
  ]);

  return { products };
};
