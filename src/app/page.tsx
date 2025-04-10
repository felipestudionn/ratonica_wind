'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import SearchForm from '@/components/search/SearchForm';
import { SearchQuery } from '@/lib/types';
import { searchProducts, saveSearch } from '@/lib/services/searchService';
import { X } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput && !imagePreview) return;
    
    try {
      setIsLoading(true);
      // In a real app, we would process the search and get results
      const results = await searchProducts({
        type: imagePreview ? 'image' : 'url',
        content: imagePreview || urlInput
      });
      
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear URL input when uploading an image
    setUrlInput('');

    // Create a preview of the image
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const clearImagePreview = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Grid Background with Vintage Clothing Images */}
        <div className="relative min-h-screen">
          {/* Background Grid */}
          <div className="absolute inset-0 grid grid-cols-5 md:grid-cols-8 grid-rows-4 gap-1">
            {Array.from({ length: 32 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-cover bg-center"
                style={{ backgroundImage: `url(/images/vintage-${(i % 8) + 1}.jpg)` }}
              />
            ))}
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
            <div className="text-center mb-10">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
                ratonica
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Discover Vintage Fashion Treasures
                <br />
                across marketplaces
              </p>
            </div>
            
            {/* Search Container */}
            <div className="w-full max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <form onSubmit={handleSearch} className="p-6">
                  {imagePreview ? (
                    <div className="mb-4 relative">
                      <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                        <Image 
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-contain"
                        />
                        <button
                          type="button"
                          onClick={clearImagePreview}
                          className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <input 
                        type="text" 
                        placeholder="Paste URL or search..." 
                        className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                      />
                    </div>
                  )}
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <button 
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                      onClick={triggerFileUpload}
                    >
                      <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                        <Image src="/icons/upload.svg" alt="Upload" width={12} height={12} />
                      </div>
                      <span>Upload Image</span>
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-600">Deep search</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-bold">E</span>
                      </div>
                      <span className="text-sm text-gray-600">Expert search</span>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center ml-auto hover:bg-gray-300 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Image src="/icons/arrow-right.svg" alt="Search" width={20} height={20} />
                    )}
                  </button>
                </form>
                
                <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
                  Also search on: <span className="font-medium">Vinted</span>, <span className="font-medium">Etsy</span>, <span className="font-medium">Depop</span>, <span className="font-medium">eBay</span>, <span className="font-medium">Vestiaire Collective</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
