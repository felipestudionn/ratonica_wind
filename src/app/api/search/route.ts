import { NextRequest, NextResponse } from 'next/server';
import { SearchQuery } from '@/lib/types';
import { analyzeImage, searchProducts } from '@/lib/services/searchService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, content } = body as SearchQuery;
    
    // Validate request
    if (!type || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // If searching by image, first analyze the image
    let searchTerm = content;
    if (type === 'image') {
      try {
        searchTerm = await analyzeImage(content);
      } catch (error) {
        console.error('Error analyzing image:', error);
        return NextResponse.json(
          { error: 'Failed to analyze image' },
          { status: 500 }
        );
      }
    }
    
    // Search for products
    const results = await searchProducts({ type, content: searchTerm });
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
