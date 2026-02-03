
export type Language = 'en' | 'ru';

export interface BaseItem {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
}

// Added FilmVersion for detailed film view
export interface FilmVersion {
  id: string;
  label: string;
  videoUrl: string;
  description: string;
}

// Updated Film to support versions used in mockData and FilmDetail
export interface Film extends BaseItem {
  videoUrl: string;
  versions?: FilmVersion[];
}

export interface Project extends BaseItem {}
export interface Work extends BaseItem {}

// Added AccordionItem for projects/works lists
export interface AccordionItem {
  id: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  image: string;
}

// Added Product and Variation types for the shop
export interface ProductVariation {
  id: string;
  name: Record<Language, string>;
  price: number;
}

export interface Product {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  variations: {
    format: ProductVariation[];
    resolution: ProductVariation[];
    license: ProductVariation[];
  };
}

// Added CartItem type
export interface CartItem {
  cartId: string;
  productId: string;
  title: string;
  price: number;
  variationDetails: {
    format: string;
    resolution: string;
    license: string;
  };
}

// Expanded TranslationSet to include all missing sections used in the app
export interface TranslationSet {
  nav: {
    home: string;
    films: string;
    projects: string;
    works: string;
    admin: string;
    shop: string;
  };
  common: {
    back: string;
    readMore: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    cta: string;
  };
  films: {
    versions: string;
  };
  shop: {
    cart: string;
    emptyCart: string;
    total: string;
    checkout: string;
    format: string;
    resolution: string;
    license: string;
    addToCart: string;
    thanks: string;
    downloadLinks: string;
    emailRequired: string;
    completePayment: string;
  };
  admin: {
    title: string;
    add: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
  };
}

// Added cart management to LanguageContextType
export interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
}
