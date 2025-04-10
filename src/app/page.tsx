'use client';

import React from 'react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Logo from '@/components/ui/Logo';
import { X } from 'lucide-react';
import { searchProducts, saveSearch } from '@/lib/services/searchService';

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
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#f1efe7' }}>
      <Header />
      
      <main className="flex-grow">
        {/* Fashion-forward Background */}
        <div className="relative min-h-screen">
          {/* Background with Gradient Overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px">
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="relative h-full w-full overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-10000 hover:scale-110 filter grayscale hover:grayscale-0"
                    style={{ 
                      backgroundImage: `url(/images/vintage-${(i % 8) + 1}.jpg)`,
                      animationDelay: `${i * 0.5}s` 
                    }}
                  />
                  <div className="absolute inset-0" style={{ backgroundColor: 'rgba(241, 239, 231, 0.3)' }}></div>
                </div>
              ))}
            </div>
            
            {/* Diagonal Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f1efe7]/80 via-[#f1efe7]/60 to-transparent"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
              {/* Logo and Tagline Section - Top of page */}
              <div className="text-center mt-20 mb-0">
                <div className="relative flex flex-col items-center">
                  <div className="w-[960px] h-[384px] relative">
                    <Logo className="w-full h-full" />
                  </div>
                  <div className="mt-[-140px]">
                    <p className="text-lg md:text-xl text-black/80 font-light tracking-wide uppercase">
                      Discover Vintage Fashion Treasures
                      <br />
                      <span className="text-base md:text-lg tracking-widest">across marketplaces</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Search Container - Centered in page */}
              <div className="w-full max-w-2xl mx-auto mt-auto mb-auto">
                <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md overflow-hidden border border-black/5">
                  <form onSubmit={handleSearch} className="p-6">
                    {imagePreview ? (
                      <div className="mb-4 relative">
                        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-black/5">
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
                          className="w-full px-4 py-3 text-lg border border-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 bg-white/70"
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
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                        onClick={triggerFileUpload}
                      >
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                          <Image src="/icons/upload.svg" alt="Upload" width={12} height={12} className="invert" />
                        </div>
                        <span>Upload Image</span>
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-6 bg-black/5 rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-sm text-black/60 font-light">Deep search</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center">
                          <span className="text-xs font-bold text-black/60">E</span>
                        </div>
                        <span className="text-sm text-black/60 font-light">Expert search</span>
                      </div>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-10 h-10 bg-black rounded-full flex items-center justify-center ml-auto hover:opacity-90 transition-opacity"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <Image src="/icons/arrow-right.svg" alt="Search" width={20} height={20} className="invert" />
                      )}
                    </button>
                  </form>
                  
                  <div className="px-6 py-3 bg-black/5 text-xs text-black/50 font-light tracking-wider">
                    SEARCH ACROSS: <span className="font-medium">VINTED</span> · <span className="font-medium">ETSY</span> · <span className="font-medium">DEPOP</span> · <span className="font-medium">EBAY</span> · <span className="font-medium">VESTIAIRE</span>
                  </div>
                </div>
              </div>
              
              {/* Fashion Quote - Moved to bottom */}
              <div className="mt-auto mb-10 text-center max-w-md mx-auto">
                <p className="text-black/50 text-sm italic font-light tracking-wide">
                  &quot;Fashion is not something that exists in dresses only. Fashion is in the sky, in the street, fashion has to do with ideas, the way we live, what is happening.&quot;
                </p>
                <p className="text-black/40 text-xs mt-2">— Coco Chanel</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
