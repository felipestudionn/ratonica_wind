'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import SearchForm from '@/components/search/SearchForm';
import { SearchQuery } from '@/lib/types';
import { searchProducts, saveSearch } from '@/lib/services/searchService';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: SearchQuery) => {
    try {
      setIsLoading(true);
      // In a real app, we would process the search and get results
      const results = await searchProducts(query);
      
      // Save search to database and get search ID
      const searchId = await saveSearch(results);
      
      // Redirect to results page
      router.push(`/results?id=${searchId}`);
    } catch (error) {
      console.error('Search error:', error);
      setIsLoading(false);
      // In a real app, we would show an error message
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Vintage Match
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Upload an image, paste a URL, or search by text to discover similar vintage clothing across multiple platforms.
            </p>
            
            {/* Search Form */}
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload or Search</h3>
                <p className="text-gray-600">
                  Upload an image of clothing you love, paste a product URL, or search by text description.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
                <p className="text-gray-600">
                  Our AI analyzes your input and searches across multiple vintage marketplaces.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Discover Matches</h3>
                <p className="text-gray-600">
                  Browse similar vintage items ranked by our Dupe Meter for the best matches.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Platforms Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Supported Platforms</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              We search across the most popular vintage and second-hand marketplaces to find your perfect match.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <span className="font-semibold">Vinted</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <span className="font-semibold">Etsy</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <span className="font-semibold">Depop</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <span className="font-semibold">eBay</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <span className="font-semibold">VC</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
