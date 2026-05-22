import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
  const parentData = await parent();

  console.log('⛵️ /contact/map');

  const { companies } = parentData;

  console.log('✅ /contact/map');
  console.log({ companies });

  return { companies };
};
