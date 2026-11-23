import { api } from '$lib/helpers/api';
import type { PageServerLoad } from './$types';
import type { Product, Event } from '$lib/types';

export const load: PageServerLoad = async ({ parent, fetch }) => {
  await parent();

  console.log('⛵️ /');

  const includes = ['main_family', 'sub_family'].join(',');

  const [products, events] = await Promise.all([
    api(fetch).get<Product[]>(`/v1/public/products?filter[onFrontPage]=true&include=${includes}`),
    api(fetch).get<Event[]>(`/v1/public/events?include=country&upcoming=true`)
  ]);

  console.log('✅ /', products.length, events.length);

  return {
    products,
    events,
    header: { theme: 'blue overlap' }
  };
};
