import { PUBLIC_API_HOST } from '$env/static/public';
import type { PageServerLoad } from './$types';

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

  return {
    countries,
    markets,
    companies,
    events,
    theme: 'blue overlap'
  };
};
