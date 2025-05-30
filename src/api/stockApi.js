// Import mock data for fallback
import { mockStocks } from './mockData';

const RAPID_API_KEY = 'dc1be977cdmsh79d0494f0038291p1a31f6jsncbb77d658c1d';
const BASE_URL = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Cache storage
const apiCache = {
  data: null,
  lastFetch: null
};

// List of some popular stock symbols
const STOCK_SYMBOLS = [
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META',
  'TSLA', 'NVDA', 'JPM', 'BAC', 'WMT',
  'DIS', 'NFLX', 'INTC', 'AMD', 'UBER'
];

export async function fetchStockData() {
  // Check cache first
  if (apiCache.data && Date.now() - apiCache.lastFetch < CACHE_DURATION) {
    console.log('🔵 Using cached data');
    return apiCache.data;
  }

  console.log('🔄 Fetching live data from Yahoo Finance API...');
  
  try {
    // Create a single request with all symbols
    const symbolsString = STOCK_SYMBOLS.join('%2C'); // URL encode the comma
    const response = await fetch(`${BASE_URL}/${symbolsString}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw API Response:', data);

    // Check if we have valid data structure
    if (!data.body || !Array.isArray(data.body)) {
      throw new Error('Invalid API response format');
    }

    // Transform the API response into our required format
    const stocks = data.body.map(stockData => {
      if (!stockData || !stockData.symbol) return null;

      return {
        symbol: stockData.symbol,
        price: parseFloat(stockData.regularMarketPrice || stockData.price || 0),
        change: parseFloat(stockData.regularMarketChange || stockData.change || 0),
        changePercent: parseFloat(stockData.regularMarketChangePercent || stockData.changePercent || 0),
        volume: parseInt(stockData.regularMarketVolume || stockData.volume || 0)
      };
    }).filter(stock => stock !== null);

    // If we got no valid results, throw an error
    if (stocks.length === 0) {
      throw new Error('No valid stock data received');
    }

    console.log('✅ Successfully fetched live data');
    console.table(stocks.map(s => ({
      symbol: s.symbol,
      price: s.price,
      change: s.change
    })));

    // Update cache
    apiCache.data = stocks;
    apiCache.lastFetch = Date.now();
    
    return stocks;
  } catch (error) {
    console.error('❌ API Error:', error.message);
    console.log('⚠️ Using fallback mock data');
    return mockStocks;
  }
}