import chain from '$lib/helpers/chain';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
  const parentData = await parent();
  const { products } = parentData;
  const { familySlug, useSlug } = params;
  const family = chain(products).mapBy('mainFamily').filterBy('id', familySlug).first();
  const use = chain(products).mapBy('uses').flat().filterBy('id', useSlug).first();

  return { products, family, use };
};
