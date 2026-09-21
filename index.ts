export type Language = 'hi' | 'en' | 'ta' | 'bn' | 'mr' | 'gu';

export interface BoundingBox {
  id: string;
  label: string;
  category: string;
  confidence: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
}

export interface DemoImagePreset {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  items: BoundingBox[];
}

export interface StudioSettings {
  background: 'warm' | 'wood' | 'white' | 'dark' | 'transparent';
  brightness: number;
  contrast: number;
  shadow: boolean;
  sharpness: number;
}

export interface CatalogListing {
  id: string;
  productNameEn: string;
  productNameHi: string;
  productNameRegional: string;
  descriptionEn: string;
  descriptionHi: string;
  descriptionRegional: string;
  category: string;
  subCategory: string;
  ondcTaxonomy: string;
  materials: string[];
  tags: string[];
  careInstructions: string;
  rawMaterialCost: number;
  laborHours: number;
  hourlyRate: number;
  packagingCost: number;
  suggestedPrice: number;
  marketPrices: {
    ondc: number;
    meesho: number;
    amazon: number;
    gem: number;
  };
  artisanMargin: number; // percentage
  status: 'draft' | 'published' | 'pending';
  publishedChannels: string[];
  becknPayload?: object;
  imageUrl?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalListings: number;
  totalViews: number;
  totalOrders: number;
  totalRevenue: number;
  pendingPayout: number;
}
