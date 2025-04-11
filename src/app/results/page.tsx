"use client";

import React, { useState } from 'react';
import { Suspense } from 'react';
import ResultsContainer from '../../components/results/ResultsContainer';
import FilterOptions from '../../components/results/FilterOptions';
import SearchForm from '../../components/search/SearchForm';
import { FilterOptions as FilterOptionsType, Platform, SearchQuery } from '../../lib/types';
import { config } from '../../lib/config';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import { SlidersHorizontal, ArrowLeft } from 'lucide-react';

// Create a client component that uses useSearchParams
function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  // Handle search
  const handleSearch = (query: SearchQuery) => {
    console.log('Search query:', query);
    
    // Construct the URL with search parameters
    const params = new URLSearchParams();
    params.set('type', query.type);
    params.set('content', query.content);
    
    // Navigate to the results page with the new search parameters
    router.push(`/results?${params.toString()}`);
  };

  return (
    <>
      <div className="relative z-10 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header section with title and search form aligned horizontally */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-12">
            <h1 className="text-3xl font-light mb-6 md:mb-0 text-[#8a6f5c] italic tracking-tighter">Search Results</h1>
            
            {/* Search form */}
            <div className="md:flex-grow">
              <SearchForm 
                compact 
                onSearch={handleSearch}
                isLoading={false}
              />
            </div>
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filter sidebar */}
            <div className="md:col-span-1">
              <FilterOptions 
                initialFilters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          
            {/* Results grid */}
            <div className="md:col-span-3">
              <div className="bg-white/80 rounded-xl shadow-sm p-6">
                <ResultsContainer 
                  searchParams={{
                    type,
                    content,
                    id,
                    similar
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Main page component that uses Suspense
export default function ResultsPage() {
  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: '#f1efe7' }}>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<ResultsLoadingSkeleton />}>
          <ResultsContent />
        </Suspense>
      </div>
      
      <footer className="mt-auto">
        <Footer />
      </footer>
    </main>
  );
}

// Loading skeleton
function ResultsLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-32 bg-gray-200 rounded mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
