import { api } from '$lib/helpers/api';
import type { LayoutServerLoad } from './$types';
import type { Webinar } from '$lib/types';

export const load: LayoutServerLoad = async ({ parent, fetch }) => {
  await parent();

  const includes = ['image', 'video', 'document', 'person'].join(',');

  const [webinars] = await Promise.all([
    api(fetch).get<Webinar[]>(`/v1/public/webinars?include=${includes}`)
  ]);

  return {
    webinars,
    page: { id: 'webinars' },
    header: { theme: 'green overlap' }
  };
};
