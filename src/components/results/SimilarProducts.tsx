import React from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface SimilarProductsProps {
  product: Product;
  similarProducts: Product[];
  loading?: boolean;
}

export default function SimilarProducts({ 
  product, 
  similarProducts, 
  loading = false 
}: SimilarProductsProps) {
  if (loading) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!similarProducts || similarProducts.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
        <p className="text-gray-500">No similar products found.</p>
      </div>
    );
  }

  // Filter out the current product
  const filteredProducts = similarProducts.filter(p => p.id !== product.id);

  // If no products left after filtering, show message
  if (filteredProducts.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
        <p className="text-gray-500">No similar products found.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
