"use client";

import React, { useState } from 'react';
import { Link } from 'lucide-react';

interface UrlSearchProps {
  onUrlEntered: (url: string) => void;
}

const UrlSearch: React.FC<UrlSearchProps> = ({ onUrlEntered }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    
    // Clear error when user starts typing again
    if (error) setError('');
    
    // Basic validation - user will submit the form to finalize
    if (value) {
      onUrlEntered(value);
    } else {
      onUrlEntered('');
    }
  };

  const validateUrl = () => {
    if (!url) {
      setError('Please enter a URL');
      return false;
    }

    try {
      // Check if it's a valid URL
      new URL(url);
      setError('');
      return true;
    } catch (e) {
      setError('Please enter a valid URL');
      onUrlEntered('');
      return false;
    }
  };

  const handleBlur = () => {
    if (url) validateUrl();
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Link className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className={`bg-gray-50 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full pl-10 p-2.5`}
          placeholder="Paste product URL (e.g., https://www.etsy.com/listing/...)"
          value={url}
          onChange={handleUrlChange}
          onBlur={handleBlur}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Supported sites: Vinted, Etsy, Depop, eBay, Vestiaire Collective
        </p>
      </div>
    </div>
  );
};

export default UrlSearch;
