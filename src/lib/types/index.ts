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

export interface Image {
  path: string;
  variations: VariationList;
  alt: string;
}

export interface Video {
  path: string;
  variations: VariationList;
  alt: string;
}

export type ImageSize = `${number}x${number}`;
export type ImageExtension = 'webp' | 'jpg' | 'png' | 'svg' | 'mp4' | 'webm' | 'ogg';
export type Variation = `@${ImageSize}.${ImageExtension}`;
export type VariationList =
  | Variation
  | `${Variation},${Variation}`
  | `${Variation},${Variation},${Variation}`
  | `${Variation},${Variation},${Variation},${Variation}`;

export type GroupBy = 'mainFamily' | 'subFamily' | 'alloy' | 'mainFamilyForUse' | 'none';

export interface Product {
  id: string;
  name: string;
  label: string;
  pitch: string;
  status: 'new' | 'popular' | 'recommended' | 'outdated' | 'discontinued' | 'offline';
  avatarPath: string;
  avatarVariations: VariationList;
  avatarAlt: string;
  familyLabel: string;
  subFamily: ProductFamily;
  mainFamily: ProductFamily;
  uses: Use[];
  superiorProduct: Product;
  productUses: ProductUse[];
  productQualities: ProductQuality[];
}

export interface ProductFamily {
  id: string;
  nameSingle?: string;
  namePlural?: string;
  productFamily?: string;
  rank?: number;
  slug?: string;
  gist?: string;
  theFullMonty?: string;
  products?: Product[];
}

export interface Use {
  id: string;
  slug?: string;
  text?: string;
  gist?: string;
  productUses?: ProductUse[];
  products?: Product[];
}

export interface Quality {
  id: string;
  slug?: string;
  text?: string;
  gist?: string;
  productQualities?: ProductQuality[];
  products?: Product[];
}

export interface ProductUse {
  product: Product;
  use: Use;
  showAlternativeAvatar: boolean;
  rankAmongProducts: number;
  image: Image;
}

export interface ProductQuality {
  product: Product;
  quality: Quality;
  showAlternativeAvatar: boolean;
  rankAmongProducts: number;
  image: Image;
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
  documentCategory: DocumentCategory;
}

export interface DocumentCategory {
  id: string;
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

export interface Webinar {
  id: string;
  title: string;
  topic: string;
  audience: string;
  url: string;
  startTime: number;
  duration: number;
  public: boolean;
  isUpcoming: boolean;
  imagePath: string;
  imageVariations: string;
  imageCaption: string;
  imageAlt: string;
  person: Person;
  image: Image;
  video: Video;
  document: Document;
}
