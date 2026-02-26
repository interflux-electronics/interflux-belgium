import { MediaQuery } from 'svelte/reactivity';

export const isMobile = new MediaQuery('(max-width: 500px)');
export const isTablet = new MediaQuery('(min-width: 501px) and (max-width: 900px)');
export const isDesktop = new MediaQuery('(min-width: 901px) and (max-width: 1200px)');
export const isWidescreen = new MediaQuery('(min-width: 1201px)');
export const isMobileTablet = new MediaQuery('(max-width: 900px)');
export const isDesktopWidescreen = new MediaQuery('(min-width: 901px)');