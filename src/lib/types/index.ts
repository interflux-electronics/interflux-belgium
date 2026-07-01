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

export type ImageSize = `${number}x${number}`;
export type ImageExtension = 'webp' | 'jpg' | 'png' | 'svg' | 'mp4' | 'webm' | 'ogg';
export type Variation = `@${ImageSize}.${ImageExtension}`;
export type VariationList =
  | Variation
  | `${Variation},${Variation}`
  | `${Variation},${Variation},${Variation}`
  | `${Variation},${Variation},${Variation},${Variation}`;

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
}

export interface ProductFamily {
  id: string;
  nameSingle: string;
  namePlural: string;
  productFamily: string;
  rank: number;
  slug: string;
  gist: string;
  theFullMonty: string;
}

export interface Use {
  id: string;
  slug: string;
  text: string;
  gist: string;
  productUses: ProductUse[];
}

export interface ProductUse {
  product: Product;
  use: Use;
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

const AVAILABLE_ICONS = [
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'chemistry',
  'chevron-left',
  'chevron-down',
  'circuit1',
  'close',
  'document',
  'email',
  'error',
  'expand',
  'file-certificate',
  'file-medical',
  'file-spreadsheet',
  'flask-potion',
  'flask',
  'hamburger',
  'interflux',
  'leaves',
  'lightbulb',
  'linkedin',
  'map-marker-1',
  'map-marker-2',
  'map-marker-shadow',
  'megaphone',
  'microchip',
  'podcast',
  'prescription-bottle',
  'presentation',
  'primary-interflux-logo',
  'search',
  'street-view',
  'strong',
  'translation',
  'thumbs-up',
  'video',
  'wave-soldering',
  'x',
  'youtube'
] as const;

export { AVAILABLE_ICONS };

export type Icon = (typeof AVAILABLE_ICONS)[number];
