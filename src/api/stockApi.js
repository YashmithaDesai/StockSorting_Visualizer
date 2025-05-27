// Mock data fallback
import { mockStocks } from './mockData';

const API_KEY = 'DLI0RR31SQDEZK8G'; // Consider using environment variables
const BASE_URL = 'https://www.alphavantage.co/query';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Cache storage
const apiCache = {
  data: null,
  lastFetch: null
};

export const fetchStockData = async () => {
  // Return cached data if available and not expired
  if (apiCache.data && Date.now() - apiCache.lastFetch < CACHE_DURATION) {
    return apiCache.data;
  }

  try {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];
    const requests = symbols.map(symbol => {
      // Add slight delay between requests to avoid rate limiting
      return new Promise(resolve => setTimeout(resolve, 300))
        .then(() => fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`));
    });
    
    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map(async res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    }));

    // Validate and transform data
    const validStocks = data.map(item => {
      if (!item['Global Quote'] || !item['Global Quote']['01. symbol']) {
        throw new Error('Invalid API response structure');
      }
      return {
        symbol: item['Global Quote']['01. symbol'],
        price: parseFloat(item['Global Quote']['05. price']) || 0,
        change: parseFloat(item['Global Quote']['09. change']) || 0,
        changePercent: item['Global Quote']['10. change percent'] || '0%',
        volume: parseInt(item['Global Quote']['06. volume']) || 0,
        lastUpdated: new Date().toISOString()
      };
    });

    // Update cache
    apiCache.data = validStocks;
    apiCache.lastFetch = Date.now();
    
    return validStocks;
  } catch (error) {
    console.error("API Error:", error);
    // Return cached data if available, otherwise mock data
    return apiCache.data || mockStocks;
  }
};