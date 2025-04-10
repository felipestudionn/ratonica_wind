import { NextRequest, NextResponse } from 'next/server';
import { SearchResult } from '@/lib/types';
import { saveSearch, getSearchHistory } from '@/lib/services/searchService';

export async function GET() {
  try {
    const history = await getSearchHistory();
    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search history' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const searchResult = await request.json() as SearchResult;
    
    // Validate request
    if (!searchResult.query || !searchResult.products) {
      return NextResponse.json(
        { error: 'Invalid search result data' },
        { status: 400 }
      );
    }
    
    // Save search to database
    const searchId = await saveSearch(searchResult);
    
    return NextResponse.json({ searchId });
  } catch (error) {
    console.error('Error saving search:', error);
    return NextResponse.json(
      { error: 'Failed to save search' },
      { status: 500 }
    );
  }
}
