"use client";

import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice, generateAffiliateLink } from '@/lib/utils';
import DupeMeter from './DupeMeter';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    title,
    brand,
    price,
    currency,
    imageUrl,
    productUrl,
    platform,
    condition,
    similarityScore,
  } = product;

  const affiliateLink = generateAffiliateLink(productUrl);

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'new': return 'New';
      case 'like_new': return 'Like New';
      case 'good': return 'Good';
      case 'fair': return 'Fair';
      case 'poor': return 'Poor';
      default: return 'Unknown';
    }
  };

  const getPlatformLogo = (platform: string) => {
    switch (platform) {
      case 'vinted': return '/logos/vinted.svg';
      case 'etsy': return '/logos/etsy.svg';
      case 'depop': return '/logos/depop.svg';
      case 'ebay': return '/logos/ebay.svg';
      case 'vestiaire': return '/logos/vestiaire.svg';
      default: return '/logos/default.svg';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2">
          <DupeMeter score={similarityScore} />
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center mb-2">
          <Image
            src={getPlatformLogo(platform)}
            alt={platform}
            width={20}
            height={20}
            className="mr-2"
          />
          <span className="text-sm text-gray-600 capitalize">{platform}</span>
          <span className="ml-auto text-sm bg-gray-100 px-2 py-1 rounded-full">
            {getConditionLabel(condition)}
          </span>
        </div>
        
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h3>
        {brand && <p className="text-sm text-gray-600 mb-2">{brand}</p>}
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-bold text-lg">{formatPrice(price, currency)}</span>
          <a 
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-black text-white px-3 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            View <ExternalLink className="ml-1" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
