"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import ProductCard from './ProductCard';
import { getMockSearchResults } from '@/lib/services/searchService';

interface ResultsContainerProps {
  searchParams: {
    type?: string | null;
    content?: string | null;
    id?: string | null;
    similar?: string | null;
  };
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({ searchParams }) => {
  const router = useRouter();
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [platforms] = useState<string[]>([
    'vinted', 'etsy', 'depop', 'ebay', 'vestiaire'
  ]);
  const [minPrice] = useState(0);
  const [maxPrice] = useState(1000);
  const [minScore] = useState(60);

  const handleBackToSearch = () => {
    router.push('/');
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // In a real app, this would call an API with the search parameters
        // For now, we'll just use mock data
        const mockResults = getMockSearchResults();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setResults(mockResults);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to fetch results. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
  }, [searchParams]);

  // Filter results based on user preferences
  const filteredResults = results.filter(product => {
    return (
      platforms.includes(product.platform) &&
      product.price >= minPrice &&
      product.price <= maxPrice &&
      product.similarityScore >= minScore
    );
  });

  // Sort results by similarity score (highest first)
  const sortedResults = [...filteredResults].sort(
    (a, b) => {
      // Ensure we have valid numbers for comparison
      const scoreA = typeof a.similarityScore === 'number' ? a.similarityScore : 0;
      const scoreB = typeof b.similarityScore === 'number' ? b.similarityScore : 0;
      return scoreB - scoreA;
    }
  );

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/80 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-200 h-48"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-[#8a6f5c] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (sortedResults.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-medium mb-4 text-[#8a6f5c]">No results found</h2>
        <p className="text-black/50 mb-6 font-light">
          We couldn&#39;t find any matching items. Try adjusting your search or filters.
        </p>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-[#8a6f5c] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          New Search
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="text-sm text-black/50 font-light">
          {sortedResults.length} results found
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-2.5 border border-black/10 rounded-lg text-sm text-[#8a6f5c] hover:bg-[#8a6f5c]/5 transition-colors"
          >
            <SlidersHorizontal size={16} />
            <span className="hidden md:inline">Sort</span>
          </button>
          <button 
            onClick={handleBackToSearch}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#8a6f5c] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={16} />
            Back to Search
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedResults.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ResultsContainer;
