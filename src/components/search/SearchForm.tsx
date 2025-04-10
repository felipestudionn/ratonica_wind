"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { SearchQuery } from '@/lib/types';

export interface SearchFormProps {
  onSearch?: (query: SearchQuery) => void;
  isLoading?: boolean;
  compact?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading, compact = false }) => {
  const [query, setQuery] = useState<SearchQuery>({
    type: 'image',
    content: '',
  });
  const [urlInput, setUrlInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput && onSearch) {
      onSearch({
        type: 'url',
        content: urlInput
      });
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <form onSubmit={handleSearch} className="p-6">
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Paste URL or search..." 
              className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <button 
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
              onClick={() => {
                // This would open file upload dialog in a real implementation
              }}
            >
              <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 16.5L12 7.5L21 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7.5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </form>
        
        <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
          Also search on: <span className="font-medium">Vinted</span>, <span className="font-medium">Etsy</span>, <span className="font-medium">Depop</span>, <span className="font-medium">eBay</span>, <span className="font-medium">Vestiaire Collective</span>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
