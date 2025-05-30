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
import AlgorithmExplanation from './components/AlgorithmInfo/AlgorithmExplanation';
import AlgorithmRace from './components/AlgorithmRace/AlgorithmRace';
import GuessAlgorithm from './components/GuessAlgorithm/GuessAlgorithm';
import CompanyCountSelector from './components/Controls/CompanyCountSelector';

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
  const [viewMode, setViewMode] = useState('single'); // 'single', 'race', or 'guess'
  const [companyCount, setCompanyCount] = useState(15);
  const [metrics, setMetrics] = useState({
    comparisons: 0,
    swaps: 0,
    startTime: null,
    timeTaken: 0
  });

  // Function to limit stocks array based on company count
  const limitStocks = (stocksData) => {
    return stocksData.slice(0, companyCount);
  };

  // Data loading effect
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = useLiveData ? await fetchStockData() : mockStocks;
        setStocks(limitStocks(data));
        setSelectedStock(null);
      } catch (error) {
        console.error("Error loading data:", error);
        setStocks(limitStocks(mockStocks));
        if (useLiveData) setUseLiveData(false);
      }
      setIsLoading(false);
    };
    
    loadData();
  }, [useLiveData, companyCount]);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };

  const handleDataChange = async (useLive) => {
    setIsLoading(true);
    try {
      const data = useLive ? await fetchStockData() : mockStocks;
      setStocks(limitStocks(data));
    } catch (error) {
      console.error("Data load error:", error);
      setStocks(limitStocks(mockStocks));
    }
    setIsLoading(false);
  };

  return (
    <div className="app">
      <h1>Stock Sorting Visualizer</h1>
      
      <div className="view-mode-toggle">
        <button 
          className={`mode-button ${viewMode === 'single' ? 'active' : ''}`}
          onClick={() => setViewMode('single')}
        >
          Single Algorithm
        </button>
        <button 
          className={`mode-button ${viewMode === 'race' ? 'active' : ''}`}
          onClick={() => setViewMode('race')}
        >
          Algorithm Race
        </button>
        <button 
          className={`mode-button ${viewMode === 'guess' ? 'active' : ''}`}
          onClick={() => setViewMode('guess')}
        >
          Guess Algorithm
        </button>
      </div>

      <div className="data-controls">
        <DataSourceToggle
          useLiveData={useLiveData}
          setUseLiveData={setUseLiveData}
          isSorting={isSorting}
          onDataChange={handleDataChange}
        />
        <CompanyCountSelector
          companyCount={companyCount}
          setCompanyCount={setCompanyCount}
          disabled={isSorting}
        />
      </div>
      
      {isLoading ? (
        <div className="loading">Loading data...</div>
      ) : viewMode === 'single' ? (
        <>
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

          <div className="visualization-container">
            <Visualization
              stocks={stocks}
              visualizationType={visualizationType}
              sortKey={sortKey}
              onStockSelect={setSelectedStock}  
            />
            
            <AlgorithmExplanation 
              activeAlgorithm={activeAlgorithm}
            />
          </div>
          
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
      ) : viewMode === 'race' ? (
        <AlgorithmRace
          stocks={stocks}
          onStockSelect={setSelectedStock}
          sortKey={sortKey}
          visualizationType={visualizationType}
          speed={speed}
          setStocks={setStocks}
          setIsSorting={setIsSorting}
        />
      ) : (
        <GuessAlgorithm
          stocks={stocks}
          onStockSelect={setSelectedStock}
          sortKey={sortKey}
          visualizationType={visualizationType}
          speed={speed}
          setStocks={setStocks}
          setIsSorting={setIsSorting}
        />
      )}
    </div>
  );
}

export default App;