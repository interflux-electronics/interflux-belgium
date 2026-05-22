import type { LayoutServerLoad } from './$types';
import { detectDevice } from '$lib/helpers';

export const load: LayoutServerLoad = async ({ request }) => {
  const userAgent = request.headers.get('user-agent');
  const device = detectDevice(userAgent);

  return {
    device
  };
};
