import type { LayoutLoad } from './$types';
import type { Company } from '$lib/types';

export const load: LayoutLoad = async ({ parent, params }) => {
  const parentData = await parent();

  console.log('⛵️ /contact/map/:slug');

  const { companies } = parentData;

  const company = companies.find((c: Company) => c.slug === params.slug);

  console.log('✅ /contact/map/:slug');
  console.log({ company });

  return { company };
};
