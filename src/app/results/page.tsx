"use client";

import React, { useState } from 'react';
import { Suspense } from 'react';
import ResultsContainer from '@/components/results/ResultsContainer';
import FilterOptions from '@/components/results/FilterOptions';
import SearchForm from '@/components/search/SearchForm';
import { FilterOptions as FilterOptionsType, Platform } from '@/lib/types';
import { config } from '@/lib/config';
import { useSearchParams } from 'next/navigation';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const content = searchParams.get('content');
  const id = searchParams.get('id');
  const similar = searchParams.get('similar');
  
  // State for filters
  const [filters, setFilters] = useState<FilterOptionsType>({
    minPrice: 0,
    maxPrice: 500,
    minSimilarity: 60,
    platforms: config.platforms.map(p => p.name as Platform),
  });

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptionsType) => {
    console.log('Filters changed:', newFilters);
    setFilters(newFilters);
    // In a real app, this would update the results
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        
        {/* New search form */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">Search Again</h2>
          <SearchForm compact />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filter sidebar */}
          <div className="md:col-span-1">
            <FilterOptions 
              initialFilters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Results container */}
          <div className="md:col-span-3">
            <Suspense fallback={<ResultsLoadingSkeleton />}>
              <ResultsContainer 
                searchParams={{ type, content, id, similar }}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}

function ResultsLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
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
