// Type definitions for the Ratonica application

// Search query types
export type SearchType = 'image' | 'url' | 'text';

export interface SearchQuery {
  type: SearchType;
  content: string;
}

// Product condition types
export type ProductCondition = 'new' | 'like_new' | 'good' | 'fair' | 'poor';

// Platform types
export type Platform = 'vinted' | 'etsy' | 'depop' | 'ebay' | 'vestiaire' | 'other';

// Product interface
export interface Product {
  id: string;
  title: string;
  brand?: string;
  description?: string;
  price: number;
  currency: string;
  imageUrl: string;
  productUrl: string;
  platform: Platform;
  source?: string;
  condition?: ProductCondition;
  similarityScore?: number;
}

// Search result interface
export interface SearchResult {
  id?: string;
  query: SearchQuery;
  products: Product[];
  timestamp: Date;
}

// Search history interface
export interface SearchHistory {
  id: string;
  query: SearchQuery;
  timestamp: Date;
  resultCount: number;
}

// User interface (for future authentication)
export interface User {
  id: string;
  email: string;
  name?: string;
  savedSearches?: string[]; // IDs of saved searches
}

// Platform configuration
export interface PlatformConfig {
  name: Platform;
  enabled: boolean;
  logo: string;
  baseUrl: string;
}

// Filter options for search results
export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  platforms?: Platform[];
  minSimilarity?: number;
  condition?: ProductCondition[];
}
