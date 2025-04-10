export interface SearchQuery {
  type: 'image' | 'url' | 'text';
  content: string;
}

export interface Product {
  id: string;
  title: string;
  brand?: string;
  description?: string;
  price: number;
  currency: string;
  imageUrl: string;
  productUrl: string;
  platform: 'vinted' | 'etsy' | 'depop' | 'ebay' | 'vestiaire';
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  similarityScore: number;
}

export interface SearchResult {
  query: SearchQuery;
  products: Product[];
  timestamp: Date;
}

export interface SearchHistory {
  id: string;
  query: SearchQuery;
  timestamp: Date;
  resultCount: number;
}

export interface PlatformConfig {
  name: string;
  enabled: boolean;
  logo: string;
  baseUrl: string;
}

export interface DupeMeterProps {
  score: number;
}

export interface SearchFormProps {
  onSearch: (query: SearchQuery) => Promise<void>;
  isLoading: boolean;
}
