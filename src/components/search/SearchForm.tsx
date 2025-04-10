"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { SearchQuery } from '@/lib/types';
import ImageUpload from './ImageUpload';
import UrlSearch from './UrlSearch';
import TextSearch from './TextSearch';

export interface SearchFormProps {
  onSearch?: (query: SearchQuery) => void;
  isLoading?: boolean;
  compact?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading, compact = false }) => {
  const [activeTab, setActiveTab] = useState<'image' | 'url' | 'text'>('image');
  const [query, setQuery] = useState<SearchQuery>({
    type: 'image',
    content: '',
  });

  const handleTabChange = (value: string) => {
    const tabValue = value as 'image' | 'url' | 'text';
    setActiveTab(tabValue);
    setQuery({ type: tabValue, content: '' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.content && onSearch) {
      onSearch(query);
    }
  };

  const updateContent = (content: string) => {
    setQuery({ ...query, content });
  };

  return (
    <div className={`w-full ${compact ? '' : 'max-w-3xl mx-auto'} bg-white rounded-xl ${compact ? '' : 'shadow-md'} overflow-hidden ${compact ? 'p-4' : 'p-6'}`}>
      {!compact && (
        <h2 className="text-2xl font-bold text-center mb-6">Find Similar Vintage Clothing</h2>
      )}
      
      <form onSubmit={handleSearch}>
        <Tabs defaultValue="image" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className={`grid grid-cols-3 ${compact ? 'mb-4' : 'mb-6'}`}>
            <TabsTrigger value="image">Upload Image</TabsTrigger>
            <TabsTrigger value="url">Product URL</TabsTrigger>
            <TabsTrigger value="text">Text Search</TabsTrigger>
          </TabsList>
          
          <TabsContent value="image">
            <ImageUpload onImageSelected={updateContent} />
          </TabsContent>
          
          <TabsContent value="url">
            <UrlSearch onUrlEntered={updateContent} />
          </TabsContent>
          
          <TabsContent value="text">
            <TextSearch onTextEntered={updateContent} />
          </TabsContent>
        </Tabs>
        
        <div className={compact ? 'mt-4' : 'mt-6'}>
          <Button 
            type="submit" 
            className="w-full bg-black hover:bg-gray-800 text-white py-3"
            disabled={!query.content || isLoading}
          >
            {isLoading ? 'Searching...' : 'Find Similar Items'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
