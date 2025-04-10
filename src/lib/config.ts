// Configuration for the application
// In a production environment, these would be environment variables

export const config = {
  // API Keys (these would be environment variables in production)
  visionApiKey: process.env.VISION_API_KEY || 'mock-vision-api-key',
  
  // Database configuration
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ratonica',
    name: 'ratonica',
  },
  
  // Supported platforms
  platforms: [
    {
      name: 'vinted',
      enabled: true,
      logo: '/logos/vinted.svg',
      baseUrl: 'https://www.vinted.com',
    },
    {
      name: 'etsy',
      enabled: true,
      logo: '/logos/etsy.svg',
      baseUrl: 'https://www.etsy.com',
    },
    {
      name: 'depop',
      enabled: true,
      logo: '/logos/depop.svg',
      baseUrl: 'https://www.depop.com',
    },
    {
      name: 'ebay',
      enabled: true,
      logo: '/logos/ebay.svg',
      baseUrl: 'https://www.ebay.com',
    },
    {
      name: 'vestiaire',
      enabled: true,
      logo: '/logos/vestiaire.svg',
      baseUrl: 'https://www.vestiairecollective.com',
    },
  ],
  
  // Affiliate configuration
  affiliate: {
    enabled: true,
    paramName: 'ref',
    paramValue: 'ratonica',
  },
};
