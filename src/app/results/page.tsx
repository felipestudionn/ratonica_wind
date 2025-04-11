"use client";

import React, { useState } from 'react';
import { Suspense } from 'react';
import ResultsContainer from '../../components/results/ResultsContainer';
import FilterOptions from '../../components/results/FilterOptions';
import { FilterOptions as FilterOptionsType, Platform } from '../../lib/types';
import { config } from '../../lib/config';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';

// Create a client component that uses useSearchParams
function ResultsContent() {
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
    <>
      <div className="relative z-10 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Header section with title aligned with FilterOptions */}
            <div className="md:col-span-1 mb-0">
              <h1 className="text-[1.17rem] text-[#8a6f5c] uppercase ultra-thin-text tracking-[0.11em] whitespace-nowrap w-full mb-0">SEARCH RESULTS</h1>
            </div>
            
            {/* Empty space for alignment on desktop */}
            <div className="hidden md:block md:col-span-3 mb-0"></div>
            
            <div className="md:col-span-1">
              <div className="border-t border-gray-200 bg-[#f1efe7]">
                <FilterOptions 
                  initialFilters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
            
            {/* Results grid */}
            <div className="md:col-span-3">
              <div className="border-t border-gray-200 bg-[#f1efe7] py-4 px-6 h-full">
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
