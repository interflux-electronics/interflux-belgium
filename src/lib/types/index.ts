import type { Icon } from '$lib/components/Svg.svelte';

export interface Country {
  id: string;
  nameNative: string;
  nameEnglish: string;
}

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

type ImageSize = `${number}x${number}`;
type ImageExtension = 'webp' | 'jpg' | 'png' | 'svg';
export type Variation = `@${ImageSize}.${ImageExtension}`;
export type VariationList =
  | Variation
  | `${Variation},${Variation}`
  | `${Variation},${Variation},${Variation}`;

export interface Product {
  id: string;
  name: string;
  label: string;
  isNew: boolean;
  isPopular: boolean;
  avatarPath: string;
  avatarVariations: VariationList;
  avatarAlt: string;
  familyLabel: string;
  status: 'new' | 'popular';
  subFamily: ProductFamily;
  mainFamily: ProductFamily;
}

export interface ProductFamily {
  nameSingle: string;
  namePlural: string;
  productFamily: string;
  rank: number;
  slug: string;
  gist: string;
  theFullMonty: string;
}

export interface Event {
  id: string;
  name: string;
  dates: string;
  startDate: string;
  endDate: string;
  city: string;
  description: string;
  website: string;
  country: Country;
  hasEnded: boolean;
  hasRegistrationForm: boolean;
  datesCombined: string;
  websiteShort: string;
}

export interface Document {
  id: string;
  name: string;
  path: string;
  variations: string;
  documentCategory: any;
}

interface JsonApiResource<Attributes = Record<string, unknown>> {
  id: string;
  type: string;
  attributes: Attributes;
}

interface CountryAttributes {
  'name-english': string;
  'name-native': string;
  latitude: string;
  longitude: string;
}

interface CompanyAttributes {
  'business-name': string;
  order: number;
  'public-members': string;
}

interface DocumentAttributes {
  name: string;
  path: string;
  variations: string;
}

export type CountryData = JsonApiResource<CountryAttributes>;
export type DocumentData = JsonApiResource<DocumentAttributes>;
export type CompanyData = JsonApiResource<CompanyAttributes>;

// After JSON API normalisation

export interface Person {
  id: string;
  fullName: string;
  avatarPath: string;
  avatarVariations: VariationList;
  avatarAlt: string;
}

export interface CompanyMember {
  id: string;
  title: string;
  email: string;
  person: Person;
}

export interface Company {
  id: string;
  slug: string;
  businessName: string;
  order: number;
  country: Country;
  publicMembers: CompanyMember[];
}

export interface Device {
  type: string;
}
