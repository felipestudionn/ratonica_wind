"use client";

import React, { useState, useRef } from 'react';
import { SearchQuery } from '@/lib/types';
import Image from 'next/image';

export interface SearchFormProps {
  onSearch?: (query: SearchQuery) => void;
  isLoading?: boolean;
  compact?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading, compact = false }) => {
  const [urlInput, setUrlInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For debugging
    console.log('Search button clicked');
    console.log('URL input:', urlInput);
    console.log('Image preview:', imagePreview);
    
    // Allow empty searches in compact mode
    if (compact || urlInput || imagePreview) {
      if (onSearch) {
        if (imagePreview) {
          onSearch({
            type: 'image',
            content: imagePreview
          });
        } else {
          onSearch({
            type: 'url',
            content: urlInput
          });
        }
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-lg overflow-hidden">
        <form onSubmit={handleSearch} className="p-6">
          {imagePreview ? (
            <div className="mb-4 relative">
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src={imagePreview} 
                  alt="Preview" 
                  fill 
                  style={{ objectFit: 'contain' }} 
                />
                <button 
                  type="button"
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
                  onClick={clearImage}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 justify-center w-full">
              <button 
                type="button"
                className="flex-shrink-0 flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                onClick={triggerFileUpload}
              >
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <Image src="/icons/upload.svg" alt="Upload" width={12} height={12} className="invert" />
                </div>
                <span>Upload Image</span>
              </button>
              
              <span className="text-black/40 text-sm font-light px-1">or</span>
              
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  placeholder=""
                  className="w-full px-4 py-3 text-base font-light tracking-wide border border-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 bg-white/70"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
                {!urlInput && (
                  <div className="absolute inset-0 flex items-center pointer-events-none px-4">
                    <span className="text-black/50 font-light text-base">fashion term: <span className="italic">"Chloe dress 2004"</span></span>
                  </div>
                )}
              </div>
              <button 
                type="submit" 
                className="flex-shrink-0 flex items-center gap-2 px-4 py-3 bg-[#8a6f5c] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                <span>Search</span>
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
