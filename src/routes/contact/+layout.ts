import { PUBLIC_API_HOST as apiHost } from '$env/static/public';
import { normalizeJsonApi, getJson } from '$lib/helpers';
import { getOptions } from '$lib/state/headers.svelte';
import { sortBy } from '$lib/helpers';
import type { LayoutLoad } from './$types';
import type { Company } from '$lib/types';

export const load: LayoutLoad = async ({ fetch }) => {
  console.log('⛵️ /contact');

  const [companiesData, events] = await Promise.all([
    fetch(
      `${apiHost}/v1/public/companies?filter[shownOnMainWebsite]=true&include=country,public_members,public_members.person`,
      getOptions
    )
      .then(getJson)
      .then(normalizeJsonApi),
    fetch(`${apiHost}/v1/public/events`, getOptions).then(getJson).then(normalizeJsonApi)
  ]);

  const companies: Company[] = companiesData.map((company: Company) => {
    const slug = company.businessName.replace(/\(|\)|®|,|\.|\//g, '').replace(/\s/g, '-');
    const publicMembers = company.publicMembers.sort(sortBy('rankAmongMembers'));

    return { ...company, slug, publicMembers };
  });

  console.log('✅ /contact');
  console.log({ companies, events });

  return {
    companies,
    events,
    theme: 'blue overlap' // configured per route
  };
};

// import { header } from '$lib/state/header.svelte';
// import { main } from '$lib/state/main.svelte';
// import { footer } from '$lib/state/footer.svelte';
// import { page } from '$lib/state/page.svelte';