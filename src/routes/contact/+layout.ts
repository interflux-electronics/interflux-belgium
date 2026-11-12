import { normalizeJsonApi, getJson } from '$lib/helpers';
import { getOptions } from '$lib/state/headers.svelte';
import chain from '$lib/helpers/chain';
import type { LayoutLoad } from './$types';
import type { Company } from '$lib/types';

export const load: LayoutLoad = async ({ fetch }) => {
  console.log('⛵️ /contact');

  const [companiesData, events] = await Promise.all([
    fetch(
      '/api/v1/public/companies?filter[shownOnMainWebsite]=true&include=country,public_members,public_members.person',
      getOptions
    )
      .then(getJson)
      .then(normalizeJsonApi),
    fetch('/api/v1/public/events', getOptions).then(getJson).then(normalizeJsonApi)
  ]);

  const companies: Company[] = companiesData.map((company: Company) => {
    const slug = company.businessName.replace(/\(|\)|®|,|\.|\//g, '').replace(/\s/g, '-');
    const publicMembers = chain(company.publicMembers).sortBy('rankAmongMembers');

    return { ...company, slug, publicMembers };
  });

  console.log('✅ /contact');
  console.log({ companies, events });

  return {
    companies,
    events,
    header: { theme: 'blue overlap' }
  };
};
