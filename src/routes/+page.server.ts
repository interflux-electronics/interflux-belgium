import { PUBLIC_API_HOST as apiHost } from '$env/static/public';
import { normalizeJsonApi, getJson } from '$lib/helpers';
import { getOptions } from '$lib/state/headers.svelte';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  console.log('⛵️ /');

  const [products, events] = await Promise.all([
    fetch(
      `${apiHost}/v1/public/products?filter[onFrontPage]=true&include=main_family,sub_family`,
      getOptions
    )
      .then(getJson)
      .then(normalizeJsonApi),
    fetch(`${apiHost}/v1/public/events?include=country&upcoming=true`, getOptions)
      .then(getJson)
      .then(normalizeJsonApi)
  ]);

  console.log('✅ /', products.length, events.length);

  return {
    products,
    events,
    theme: 'blue overlap' // configured per route
  };
};

// <a data-sveltekit-preload-data>

// activate() {
//   this.page.update({
//     id: 'homepage',
//     title: 'Interflux'
//   });
// }

// async model() {
//   if (this.cachedPayload) {
//     return this.cachedPayload;
//   }

//   const results = await hashSettled({
//     products: this.store.query('product', {
//       filter: { onFrontPage: true },
//       include: 'main_family,sub_family'
//     }),
//     events: this.store.query('event', {
//       include: 'country'
//     })
//   });

//   return {
//     products:
//       results.products.state === 'fulfilled' ? results.products.value : null,
//     events: results.events.state === 'fulfilled' ? results.events.value : null
//   };
// }

// model() {
//   if (this.cachedPayload) {
//     return this.cachedPayload;
//   }

//   const payload = {
//     products: this.store.query('product', {
//       filter: { onFrontPage: true },
//       include: 'main_family,sub_family'
//     }),
//     events: this.store.query('event', {
//       include: 'country'
//     })
//   };

//   return hash(payload);
// }

//   afterModel(model) {
//     this.headData.update(this.seo.homepage(model.events));
//   }
// }
