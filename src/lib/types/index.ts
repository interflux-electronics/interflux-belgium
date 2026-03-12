import type { Icon } from '$lib/components/Svg.svelte';

export interface Category {
  id: string;
  label: string;
  long?: string;
  icon: Icon;
}

export interface Language {
  id: string;
  label: string;
}

export interface File {
  url: string;
  label: string;
  language: Language;
  category: Category;
}

export interface Product {
  name: string;
}
