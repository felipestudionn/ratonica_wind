"use client";

import React, { useState } from 'react';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import { FilterOptions as FilterOptionsType, Platform } from '@/lib/types';
import { config } from '@/lib/config';

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

  // Handle price range change
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    setFilters({
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
  };

  // Apply filters
  const applyFilters = () => {
    onFilterChange(filters);
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
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">Filter Results</h3>
      
      {/* Price Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
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
      
      {/* Similarity Score Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Minimum Similarity Score: {similarityThreshold}%
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
      
      {/* Platform Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Platforms:</label>
        <div className="flex flex-wrap gap-2">
          {config.platforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handlePlatformToggle(platform.name as Platform)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedPlatforms.includes(platform.name as Platform)
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Filter Actions */}
      <div className="flex gap-2">
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={resetFilters} variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  );
}
