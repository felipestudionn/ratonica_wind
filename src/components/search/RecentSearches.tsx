import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SearchHistory } from '@/lib/types';
import { getSearchHistory } from '@/lib/services/searchService';
import { formatPrice } from '@/lib/utils';

export default function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState<SearchHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        setIsLoading(true);
        const history = await getSearchHistory();
        // Convert to SearchHistory format
        const searchHistory: SearchHistory[] = history.map((item) => ({
          id: (item as any).id || '',
          query: item.query,
          timestamp: item.timestamp,
          resultCount: item.products.length,
        }));
        setRecentSearches(searchHistory);
      } catch (error) {
        console.error('Error fetching recent searches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentSearches();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recent Searches</h3>
        <div className="animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (recentSearches.length === 0) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recent Searches</h3>
        <p className="text-gray-500 text-sm">No recent searches found.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Recent Searches</h3>
      <div className="space-y-2">
        {recentSearches.map((search) => (
          <Link 
            href={`/results?id=${search.id}`} 
            key={search.id}
            className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {search.query.type === 'text' 
                    ? `"${search.query.content}"` 
                    : search.query.type === 'url' 
                      ? 'URL Search' 
                      : 'Image Search'}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(search.timestamp).toLocaleDateString()} • {search.resultCount} results
                </p>
              </div>
              <div className="text-indigo-600">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
