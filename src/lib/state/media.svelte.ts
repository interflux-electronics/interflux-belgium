import { MediaQuery } from 'svelte/reactivity';

export const mobile = new MediaQuery('(max-width: 500px)');
export const tablet = new MediaQuery('(min-width: 501px) and (max-width: 900px)');
export const desktop = new MediaQuery('(min-width: 901px) and (max-width: 1200px)');
export const widescreen = new MediaQuery('(min-width: 1201px)');
