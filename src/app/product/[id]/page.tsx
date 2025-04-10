import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import DupeMeter from '@/components/results/DupeMeter';
import SimilarProducts from '@/components/results/SimilarProducts';
import { getMockSearchResults } from '@/lib/services/searchService';
import { formatPrice, generateAffiliateLink, getPlatformLogo, getConditionLabel } from '@/lib/utils';

type ProductPageProps = {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ProductPage({ params }: ProductPageProps) {
  // In a real app, this would fetch the product from an API
  const products = getMockSearchResults();
  const product = products.find((p) => p.id === params.id);
  
  // If product not found, show 404
  if (!product) {
    notFound();
  }
  
  // Get platform logo
  const platformLogo = getPlatformLogo(product.platform);
  
  // Generate affiliate link
  const affiliateLink = generateAffiliateLink(product.productUrl);
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/results" className="text-indigo-600 hover:text-indigo-800 flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to Results
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 relative">
            <div className="aspect-square relative">
              <Image 
                src={product.imageUrl} 
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <div className="flex items-center mb-2">
              <Image 
                src={platformLogo} 
                alt={product.platform} 
                width={24} 
                height={24}
                className="mr-2"
              />
              <span className="text-sm text-gray-500 capitalize">{product.platform}</span>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            
            {product.brand && (
              <p className="text-gray-700 mb-2">Brand: <span className="font-medium">{product.brand}</span></p>
            )}
            
            {product.condition && (
              <p className="text-gray-700 mb-2">Condition: <span className="font-medium">{getConditionLabel(product.condition)}</span></p>
            )}
            
            <div className="text-2xl font-bold text-indigo-600 mb-4">
              {formatPrice(product.price, product.currency)}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-2">Similarity Score:</p>
              <DupeMeter score={product.similarityScore} />
            </div>
            
            {product.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center px-4 py-2 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View on {product.platform.charAt(0).toUpperCase() + product.platform.slice(1)}
              </a>
              
              <Link 
                href={`/results?similar=${product.id}`}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 rounded-md font-medium text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Find Similar
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Products Section */}
      <SimilarProducts 
        product={product} 
        similarProducts={products.filter(p => p.id !== product.id)} 
      />
    </main>
  );
}
