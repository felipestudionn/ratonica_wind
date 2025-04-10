# Ratonica - Find Similar Vintage Clothing

Ratonica is a web application that helps users find vintage clothing similar to their favorite pieces. It works like Dupe.com but is specifically focused on vintage and second-hand fashion.

## Features

- **Multi-method Search**: Upload an image, paste a URL, or search by text
- **AI-Powered Matching**: Find similar vintage items across multiple platforms
- **Dupe Meter**: See how closely items match your search
- **Multi-Platform Integration**: Search across Vinted, Etsy, Depop, eBay, and Vestiaire Collective
- **Affiliate Marketing**: Built-in structure for monetization

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Node.js with Python bridge for scraping and analysis
- **Database**: MongoDB/Firebase for storing search history
- **APIs**: Vision API for image analysis (mock implementation for now)
- **Deployment**: Ready for Vercel deployment

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app`: Next.js App Router pages
- `/src/components`: Reusable UI components
  - `/ui`: Base UI components
  - `/search`: Search-related components
  - `/results`: Results display components
- `/src/lib`: Utilities, services, and types
  - `/services`: API and data services
  - `/types`: TypeScript type definitions
  - `/utils`: Helper functions

## Future Development

- Chrome extension for searching while browsing other sites
- Mobile app using React Native
- Advanced filtering options
- User accounts and saved searches
- Real API integrations with vintage marketplaces
