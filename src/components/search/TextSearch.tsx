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
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-700 font-medium">Example searches:</p>
        <ul className="text-sm text-gray-500 space-y-1">
          <li>&quot;Vintage Levi&apos;s 501 jeans&quot;</li>
          <li>&quot;70s floral maxi dress&quot;</li>
          <li>&quot;Y2K platform boots&quot;</li>
        </ul>
      </div>
    </div>
  );
};

export default TextSearch;
