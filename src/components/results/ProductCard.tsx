"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ExternalLink } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice, generateAffiliateLink } from '@/lib/utils';
import DupeMeter from './DupeMeter';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    title,
    brand,
    price,
    currency,
    imageUrl,
    productUrl,
    platform,
    similarityScore,
  } = product;

  const affiliateLink = generateAffiliateLink(productUrl);

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

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className="bg-white/80 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white"
        >
          <Heart 
            size={18} 
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-black/60'} 
          />
        </button>
        
        {/* DupeMeter */}
        <div className="absolute bottom-3 left-3">
          {similarityScore !== undefined && (
            <DupeMeter score={similarityScore} size="sm" />
          )}
        </div>
        
        {/* Platform Badge */}
        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
          <Image
            src={getPlatformLogo(platform)}
            alt={platform}
            width={16}
            height={16}
            className="mr-1"
          />
          <span className="text-xs font-medium capitalize">{platform}</span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-medium text-sm line-clamp-2 flex-grow">{title}</h3>
        </div>
        
        {brand && <p className="text-xs text-black/50 font-light mb-2">{brand}</p>}
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="font-medium text-[#8a6f5c]">{formatPrice(price, currency)}</span>
          <a 
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-medium text-[#8a6f5c] hover:text-[#a58778] transition-colors"
          >
            View <ExternalLink className="ml-1" size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
