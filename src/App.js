import React, { useState, useEffect } from 'react';
import { fetchStockData } from './api/stockApi';
import Controls from './components/Controls/Controls';
import Visualization from './components/Visualizations/Visualization';
import './styles/main.css';
import PerformanceMetrics from './components/Metrics/PerformanceMetrics';
import DataSourceToggle from './components/Controls/DataSourceToggle';
import StockInfoPanel from './components/Metrics/StockInfoPanel';
import { mockStocks } from './api/mockData';
import StockVisualization from './components/Visualizations/StockVisualization';

function App() {
  const [stocks, setStocks] = useState([]);
  const [useLiveData, setUseLiveData] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [activeAlgorithm, setActiveAlgorithm] = useState('bubble');
  const [sortKey, setSortKey] = useState('price');
  const [speed, setSpeed] = useState(500);
  const [visualizationType, setVisualizationType] = useState('bar');
  const [metrics, setMetrics] = useState({
    comparisons: 0,
    swaps: 0,
    startTime: null,
    timeTaken: 0
  });

  // Data loading effect
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = useLiveData ? await fetchStockData() : mockStocks;
        setStocks(data);
        setSelectedStock(null);
      } catch (error) {
        console.error("Error loading data:", error);
        setStocks(mockStocks); // Fallback to mock data
        if (useLiveData) setUseLiveData(false); // Revert to mock if live fails
      }
      setIsLoading(false);
    };
    
    loadData();
  }, [useLiveData]);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };
  const handleDataChange = async (useLive) => {
  setIsLoading(true);
  try {
    const data = useLive ? await fetchStockData() : mockStocks;
    setStocks(data);
  } catch (error) {
    console.error("Data load error:", error);
    setStocks(mockStocks); // Fallback to mock data
  }
  setIsLoading(false);
};

  return (
    <div className="app">
      <h1>Stock Sorting Visualizer</h1>
      
      <DataSourceToggle
        useLiveData={useLiveData}
        setUseLiveData={setUseLiveData}
        isSorting={isSorting}
        onDataChange={handleDataChange}
      />
      
      <Controls
        activeAlgorithm={activeAlgorithm}
        setActiveAlgorithm={setActiveAlgorithm}
        sortKey={sortKey}
        setSortKey={setSortKey}
        speed={speed}
        setSpeed={setSpeed}
        visualizationType={visualizationType}
        setVisualizationType={setVisualizationType}
        isSorting={isSorting}
        stocks={stocks}
        setStocks={setStocks}
        setIsSorting={setIsSorting}
        setMetrics={setMetrics}
        metrics={metrics}
      />
      
      {isLoading ? (
        <div className="loading">Loading data...</div>
      ) : (
        <>
          <Visualization
            stocks={stocks}
            visualizationType={visualizationType}
            sortKey={sortKey}
            onStockSelect={setSelectedStock}  
          />
          
          <PerformanceMetrics 
            metrics={metrics}
            activeAlgorithm={activeAlgorithm}
            sortKey={sortKey}
            isSorting={isSorting}
          />
          
          <StockInfoPanel 
            selectedStock={selectedStock} 
            stocks={stocks} 
          />
        </>
      )}
    </div>
  );
}

export default App;