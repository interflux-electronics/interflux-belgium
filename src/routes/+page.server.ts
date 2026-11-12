import { normalizeJsonApi, getJson } from '$lib/helpers';
import { getOptions } from '$lib/state/headers.svelte';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  console.log('⛵️ /');

  const [products, events] = await Promise.all([
    fetch(
      `/api/v1/public/products?filter[onFrontPage]=true&include=main_family,sub_family`,
      getOptions
    )
      .then(getJson)
      .then(normalizeJsonApi),
    fetch(`/api/v1/public/events?include=country&upcoming=true`, getOptions)
      .then(getJson)
      .then(normalizeJsonApi)
  ]);

  console.log('✅ /', products.length, events.length);

  return {
    products,
    events,
    header: { theme: 'blue overlap' }
  };
};
