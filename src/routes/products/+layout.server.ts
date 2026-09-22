import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  return {
    page: { id: 'products', theme: 'grey' },
    headerTheme: 'blue'
  };
};
