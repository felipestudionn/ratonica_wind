import { SearchResult, SearchHistory } from '@/lib/types';
import { config } from '@/lib/config';

// This is a mock implementation of database service
// In a real application, this would connect to MongoDB or Firebase

// In-memory storage for development
interface SearchResultWithId extends SearchResult {
  id: string;
}

const searchHistoryStore: SearchResultWithId[] = [];

/**
 * Save a search result to the database
 */
export async function saveSearchToDb(searchResult: SearchResult): Promise<string> {
  // Generate a unique ID
  const id = Math.random().toString(36).substring(2, 15);
  
  // Add ID to the search result
  const resultWithId: SearchResultWithId = {
    ...searchResult,
    id,
  };
  
  // In a real app, this would save to MongoDB
  // For now, we'll just store in memory
  searchHistoryStore.push(resultWithId);
  
  console.log(`Saved search with ID: ${id}`);
  return id;
}

/**
 * Get a search result by ID
 */
export async function getSearchById(id: string): Promise<SearchResult | null> {
  // In a real app, this would query MongoDB
  const result = searchHistoryStore.find(item => item.id === id);
  return result || null;
}

/**
 * Get recent search history
 */
export async function getRecentSearches(limit: number = 10): Promise<SearchHistory[]> {
  // In a real app, this would query MongoDB
  return searchHistoryStore
    .slice(0, limit)
    .map(result => ({
      id: result.id,
      query: result.query,
      timestamp: result.timestamp,
      resultCount: result.products.length,
    }));
}

/**
 * Initialize database connection
 * In a real app, this would connect to MongoDB
 */
export async function initDatabase(): Promise<void> {
  console.log('Initializing database connection...');
  console.log(`Database URI: ${config.database.uri}`);
  // In a real app, this would establish a connection to MongoDB
  
  return Promise.resolve();
}
