"use client";

import React, { useState } from 'react';
import { Slider } from '@/components/ui/Slider';
import { FilterOptions as FilterOptionsType, Platform } from '@/lib/types';
import { config } from '@/lib/config';
import { ChevronDown } from 'lucide-react';

interface FilterOptionsProps {
  initialFilters: FilterOptionsType;
  onFilterChange: (filters: FilterOptionsType) => void;
}

export default function FilterOptions({ initialFilters, onFilterChange }: FilterOptionsProps) {
  const [filters, setFilters] = useState<FilterOptionsType>(initialFilters);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters.minPrice || 0,
    initialFilters.maxPrice || 500,
  ]);
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(
    initialFilters.minSimilarity || 60
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(
    initialFilters.platforms || config.platforms.map(p => p.name as Platform)
  );

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    similarity: true,
    platforms: true,
    category: false,
    color: false,
    designer: false,
    size: false,
  });

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Handle price range change
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    setFilters({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
    onFilterChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  // Handle similarity threshold change
  const handleSimilarityChange = (value: number) => {
    setSimilarityThreshold(value);
    setFilters({
      ...filters,
      minSimilarity: value,
    });
    onFilterChange({
      ...filters,
      minSimilarity: value,
    });
  };

  // Handle platform selection
  const handlePlatformToggle = (platform: Platform) => {
    const newSelectedPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter(p => p !== platform)
      : [...selectedPlatforms, platform];
    
    setSelectedPlatforms(newSelectedPlatforms);
    setFilters({
      ...filters,
      platforms: newSelectedPlatforms,
    });
    onFilterChange({
      ...filters,
      platforms: newSelectedPlatforms,
    });
  };

  // Reset filters
  const resetFilters = () => {
    const defaultFilters: FilterOptionsType = {
      minPrice: 0,
      maxPrice: 500,
      minSimilarity: 60,
      platforms: config.platforms.map(p => p.name as Platform),
    };
    
    setPriceRange([defaultFilters.minPrice!, defaultFilters.maxPrice!]);
    setSimilarityThreshold(defaultFilters.minSimilarity!);
    setSelectedPlatforms(defaultFilters.platforms!);
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <>
      {/* Price Filter */}
      <div className="py-4">
        <button 
          onClick={() => toggleSection('price')}
          className="w-full flex justify-between items-center text-left"
        >
          <h3 className="text-base font-medium uppercase text-gray-800">PRICE</h3>
          <ChevronDown 
            size={20} 
            className={`transition-transform text-gray-500 ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${expandedSections.price ? 'block' : 'hidden'}`}>
          <div className="text-gray-500 py-1">All</div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2 text-gray-500">
              ${priceRange[0]} - ${priceRange[1]}
            </label>
            <Slider
              defaultValue={priceRange}
              min={0}
              max={1000}
              step={10}
              onValueChange={handlePriceChange}
              className="mb-2"
            />
          </div>
        </div>
      </div>
      
      {/* Similarity Score Filter */}
      <div className="py-4">
        <button 
          onClick={() => toggleSection('similarity')}
          className="w-full flex justify-between items-center text-left"
        >
          <h3 className="text-base font-medium uppercase text-gray-800">SIMILARITY SCORE</h3>
          <ChevronDown 
            size={20} 
            className={`transition-transform text-gray-500 ${expandedSections.similarity ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${expandedSections.similarity ? 'block' : 'hidden'}`}>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2 text-gray-500">
              Minimum Similarity: {similarityThreshold}%
            </label>
            <Slider
              defaultValue={[similarityThreshold]}
              min={0}
              max={100}
              step={5}
              onValueChange={(value: number[]) => handleSimilarityChange(value[0])}
              className="mb-2"
            />
          </div>
        </div>
      </div>
      
      {/* Platform Filter */}
      <div className="py-4">
        <button 
          onClick={() => toggleSection('platforms')}
          className="w-full flex justify-between items-center text-left"
        >
          <h3 className="text-base font-medium uppercase text-gray-800">PLATFORMS</h3>
          <ChevronDown 
            size={20} 
            className={`transition-transform text-gray-500 ${expandedSections.platforms ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${expandedSections.platforms ? 'block' : 'hidden'}`}>
          <div className="flex flex-wrap gap-2 mt-2">
            {config.platforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handlePlatformToggle(platform.name as Platform)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedPlatforms.includes(platform.name as Platform)
                    ? 'bg-[#8a6f5c]/20 text-[#8a6f5c]'
                    : 'bg-black/5 text-black/50'
                }`}
              >
                {platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category Filter */}
      <div className="py-4">
        <button 
          onClick={() => toggleSection('category')}
          className="w-full flex justify-between items-center text-left"
        >
          <h3 className="text-base font-medium uppercase text-gray-800">CATEGORY</h3>
          <ChevronDown 
            size={20} 
            className={`transition-transform text-gray-500 ${expandedSections.category ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${expandedSections.category ? 'block' : 'hidden'}`}>
          <div className="text-gray-500 py-1">All</div>
          {/* Add category options here */}
        </div>
      </div>
      
      {/* Color Filter */}
      <div className="py-4">
        <button 
          onClick={() => toggleSection('color')}
          className="w-full flex justify-between items-center text-left"
        >
          <h3 className="text-base font-medium uppercase text-gray-800">COLOR</h3>
          <ChevronDown 
            size={20} 
            className={`transition-transform text-gray-500 ${expandedSections.color ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${expandedSections.color ? 'block' : 'hidden'}`}>
          <div className="text-gray-500 py-1">All</div>
          {/* Add color options here */}
        </div>
      </div>
      
      {/* Designer Filter */}
      <div className="py-4">
        <button 
          onClick={() => toggleSection('designer')}
          className="w-full flex justify-between items-center text-left"
        >
          <h3 className="text-base font-medium uppercase text-gray-800">DESIGNER</h3>
          <ChevronDown 
            size={20} 
            className={`transition-transform text-gray-500 ${expandedSections.designer ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${expandedSections.designer ? 'block' : 'hidden'}`}>
          <div className="text-gray-500 py-1">All</div>
          {/* Add designer options here */}
        </div>
      </div>
      
      {/* Size Filter */}
      <div className="py-4">
        <button 
          onClick={() => toggleSection('size')}
          className="w-full flex justify-between items-center text-left"
        >
          <h3 className="text-base font-medium uppercase text-gray-800">CLOTHING SIZE</h3>
          <ChevronDown 
            size={20} 
            className={`transition-transform text-gray-500 ${expandedSections.size ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${expandedSections.size ? 'block' : 'hidden'}`}>
          <div className="text-gray-500 py-1">All</div>
          {/* Add size options here */}
        </div>
      </div>
      
      {/* Reset button */}
      <div className="mt-6">
        <button 
          onClick={resetFilters} 
          className="w-full px-4 py-2 border border-black/10 rounded-lg text-sm text-[#8a6f5c] hover:bg-[#8a6f5c]/5 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </>
  );
}
