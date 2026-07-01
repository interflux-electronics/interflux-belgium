import { PUBLIC_API_HOST as apiHost } from '$env/static/public';
import { normalizeJsonApi, getJson } from '$lib/helpers';
import { getOptions } from '$lib/state/headers.svelte';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
  console.log('⛵️ /products layout server');

  const [products] = await Promise.all([
    fetch(
      `${apiHost}/v1/public/products?include=main_family,sub_family,product_uses,product_uses.image,uses,product_qualities,qualities`,
      getOptions
    )
      .then(getJson)
      .then(normalizeJsonApi)
  ]);

  console.log('✅ /products layout server', products.length);

  return {
    products,
    headerTheme: 'blue'
  };
};
