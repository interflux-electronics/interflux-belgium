import { PUBLIC_API_HOST } from '$env/static/public';
import { error } from '@sveltejs/kit';
import { normalizeJsonApi } from '$lib/api/normalize';
import { Document } from '$lib/schemas/Document';
import type { PageServerLoad } from './$types';
import { type } from 'arktype';
import { updateHeader } from '$lib/state/header.svelte';

export const load: PageServerLoad = async ({ fetch }) => {
  const [countries, markets, companies, events] = await Promise.all([
    fetch(`${PUBLIC_API_HOST}/v1/public/countries`).then((r) => {
      if (!r.ok) throw new Error('User fetch failed');
      return r.json();
    }),

    fetch(`${PUBLIC_API_HOST}/v1/public/company-markets`).then((r) => {
      if (!r.ok) throw new Error('Posts fetch failed');
      return r.json();
    }),

    fetch(
      `${PUBLIC_API_HOST}/v1/public/companies?filter%5BshownOnMainWebsite%5D=true&include=public_members%2Cpublic_members.person`
    ).then((r) => {
      if (!r.ok) throw new Error('Companies fetch failed');
      return r.json();
    }),

    fetch(`${PUBLIC_API_HOST}/v1/public/events?include=country`).then((r) => {
      if (!r.ok) throw new Error('Events fetch failed');
      return r.json();
    })
  ]);

  // const payload = {
  //   countries: this.store.findAll('country'),
  //   markets: this.store.findAll('company-market'),
  //   companies: this.store.query('company', {
  //     filter: { shownOnMainWebsite: 'true' },
  //     include: ['public_members', 'public_members.person'].join(',')
  //   }),
  //   events: this.store.query('event', {
  //     include: 'country'
  //   })
  // };

  // const json = await response.json();
  // const nested = normalizeJsonApi(json);
  // const validated = Document.array()(nested);

  // if (validated instanceof type.errors) {
  //   throw error(400, `Invalid documents data: ${validated.summary}`);
  // }

  return {
    countries,
    markets,
    companies,
    events,
    theme: 'blue overlap'
  };
};
