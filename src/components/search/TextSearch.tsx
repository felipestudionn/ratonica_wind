"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface TextSearchProps {
  onTextEntered: (text: string) => void;
}

const TextSearch: React.FC<TextSearchProps> = ({ onTextEntered }) => {
  const [searchText, setSearchText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onTextEntered(value);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full pl-10 p-2.5"
          placeholder="Search by brand, item, year, style..."
          value={searchText}
          onChange={handleTextChange}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="text-sm text-gray-600">
          <h4 className="font-medium mb-1">Search Tips:</h4>
          <ul className="list-disc list-inside text-xs space-y-1">
            <li>Include brand names</li>
            <li>Specify item type</li>
            <li>Add era or decade</li>
          </ul>
        </div>
        <div className="text-sm text-gray-600">
          <h4 className="font-medium mb-1">Examples:</h4>
          <ul className="list-disc list-inside text-xs space-y-1">
            <li>"Levi's 501 jeans 90s"</li>
            <li>"Vintage Nike windbreaker"</li>
            <li>"Y2K platform boots"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TextSearch;
