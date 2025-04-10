import { Product, SearchQuery, SearchResult } from '@/lib/types';
import { saveSearchToDb, getSearchById as fetchSearchById, getRecentSearches } from './dbService';
import { calculateSimilarityScore } from '@/lib/utils';

// Mock function to simulate image analysis with Vision API
export const analyzeImage = async (imageBase64: string): Promise<string> => {
  // In a real implementation, this would call Google Vision API or similar
  console.log('Analyzing image...');
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock description of the image
  return 'vintage denim jacket with embroidery';
};

// Mock function to simulate product search across platforms
export const searchProducts = async (query: SearchQuery): Promise<SearchResult> => {
  console.log(`Searching for: ${query.type} - ${query.content}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    query,
    products: getMockSearchResults(),
    timestamp: new Date(),
  };
};

// Mock function to get search results
export const getMockSearchResults = (): Product[] => {
  return [
    {
      id: '1',
      title: 'Vintage Levi\'s Denim Jacket with Embroidered Flowers',
      brand: 'Levi\'s',
      description: 'Beautiful vintage Levi\'s jacket from the 90s with custom embroidery',
      price: 89.99,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
      productUrl: 'https://www.etsy.com/listing/123456',
      platform: 'etsy',
      condition: 'good',
      similarityScore: 92,
    },
    {
      id: '2',
      title: 'Vintage Wrangler Denim Jacket - 80s Blue Jean Jacket',
      brand: 'Wrangler',
      price: 65.50,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531',
      productUrl: 'https://www.depop.com/products/123456',
      platform: 'depop',
      condition: 'good',
      similarityScore: 85,
    },
    {
      id: '3',
      title: 'Vintage Lee Rider Denim Jacket - Classic American Workwear',
      brand: 'Lee',
      price: 120.00,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2',
      productUrl: 'https://www.vinted.com/items/123456',
      platform: 'vinted',
      condition: 'like_new',
      similarityScore: 78,
    },
    {
      id: '4',
      title: 'Rare 70s Denim Jacket with Custom Patches',
      price: 150.00,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788',
      productUrl: 'https://www.ebay.com/itm/123456',
      platform: 'ebay',
      condition: 'fair',
      similarityScore: 72,
    },
    {
      id: '5',
      title: 'Vintage Calvin Klein Denim Jacket - Y2K Style',
      brand: 'Calvin Klein',
      price: 95.00,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1605450081927-6b40c11c661f',
      productUrl: 'https://www.vestiairecollective.com/item/123456',
      platform: 'vestiaire',
      condition: 'good',
      similarityScore: 68,
    },
    {
      id: '6',
      title: 'Oversized Vintage Denim Jacket with Distressed Details',
      price: 79.99,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1608063615781-e2ef8c73d114',
      productUrl: 'https://www.depop.com/products/654321',
      platform: 'depop',
      condition: 'good',
      similarityScore: 65,
    },
    {
      id: '7',
      title: 'Vintage Tommy Hilfiger Denim Jacket - 90s Streetwear',
      brand: 'Tommy Hilfiger',
      price: 110.00,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7',
      productUrl: 'https://www.etsy.com/listing/654321',
      platform: 'etsy',
      condition: 'like_new',
      similarityScore: 63,
    },
    {
      id: '8',
      title: 'Vintage Guess Denim Jacket - Retro 80s Fashion',
      brand: 'Guess',
      price: 88.50,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9',
      productUrl: 'https://www.vinted.com/items/654321',
      platform: 'vinted',
      condition: 'good',
      similarityScore: 60,
    },
  ];
};

// Save search to database
export const saveSearch = async (searchResult: SearchResult): Promise<string> => {
  console.log('Saving search to database...');
  return await saveSearchToDb(searchResult);
};

// Get search by ID
export const getSearchById = async (id: string): Promise<SearchResult | null> => {
  return await fetchSearchById(id);
};

// Get search history
export const getSearchHistory = async (): Promise<SearchResult[]> => {
  console.log('Fetching search history...');
  const recentSearches = await getRecentSearches();
  // Convert SearchHistory to SearchResult (mock implementation)
  return recentSearches.map(item => ({
    query: item.query,
    products: [],
    timestamp: item.timestamp,
  }));
};
