import React, { useState } from 'react';
import './AlgorithmRace.css';
import StockVisualization from '../Visualizations/StockVisualization';
import AlgorithmExplanation from '../AlgorithmInfo/AlgorithmExplanation';
import PerformanceMetrics from '../Metrics/PerformanceMetrics';

const AlgorithmRace = ({
  stocks,
  onStockSelect,
  sortKey,
  visualizationType,
  speed,
  setStocks,
  setIsSorting
}) => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState({
    first: 'bubble',
    second: 'quick'
  });
  
  const [metrics, setMetrics] = useState({
    first: {
      comparisons: 0,
      swaps: 0,
      startTime: null,
      timeTaken: 0
    },
    second: {
      comparisons: 0,
      swaps: 0,
      startTime: null,
      timeTaken: 0
    }
  });

  const [isRacing, setIsRacing] = useState(false);

  const algorithms = [
    { id: 'bubble', name: 'Bubble Sort' },
    { id: 'quick', name: 'Quick Sort' },
    { id: 'merge', name: 'Merge Sort' },
    { id: 'heap', name: 'Heap Sort' }
  ];

  const handleAlgorithmChange = (position, algorithmId) => {
    setSelectedAlgorithms(prev => ({
      ...prev,
      [position]: algorithmId
    }));
  };

  const startRace = () => {
    setIsRacing(true);
    // Reset metrics
    setMetrics({
      first: { comparisons: 0, swaps: 0, startTime: Date.now(), timeTaken: 0 },
      second: { comparisons: 0, swaps: 0, startTime: Date.now(), timeTaken: 0 }
    });
    // Start both sorting visualizations
    setIsSorting(true);
  };

  const stopRace = () => {
    setIsRacing(false);
    setIsSorting(false);
  };

  return (
    <div className="algorithm-race">
      <div className="race-controls">
        <div className="algorithm-selectors">
          <div className="algorithm-select">
            <label>First Algorithm:</label>
            <select 
              value={selectedAlgorithms.first}
              onChange={(e) => handleAlgorithmChange('first', e.target.value)}
              disabled={isRacing}
            >
              {algorithms.map(algo => (
                <option key={algo.id} value={algo.id}>{algo.name}</option>
              ))}
            </select>
          </div>
          <div className="algorithm-select">
            <label>Second Algorithm:</label>
            <select 
              value={selectedAlgorithms.second}
              onChange={(e) => handleAlgorithmChange('second', e.target.value)}
              disabled={isRacing}
            >
              {algorithms.map(algo => (
                <option key={algo.id} value={algo.id}>{algo.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="race-buttons">
          <button 
            onClick={startRace} 
            disabled={isRacing || selectedAlgorithms.first === selectedAlgorithms.second}
            className="start-race"
          >
            Start Race
          </button>
          <button 
            onClick={stopRace} 
            disabled={!isRacing}
            className="stop-race"
          >
            Stop Race
          </button>
        </div>
      </div>

      <div className="race-visualizations">
        <div className="race-column">
          <h3>{algorithms.find(a => a.id === selectedAlgorithms.first)?.name}</h3>
          <StockVisualization
            stocks={stocks}
            visualizationType={visualizationType}
            sortKey={sortKey}
            onStockSelect={onStockSelect}
            algorithm={selectedAlgorithms.first}
            speed={speed}
            isRacing={isRacing}
            setMetrics={(newMetrics) => setMetrics(prev => ({
              ...prev,
              first: newMetrics
            }))}
          />
          <PerformanceMetrics
            metrics={metrics.first}
            activeAlgorithm={selectedAlgorithms.first}
            sortKey={sortKey}
            isSorting={isRacing}
          />
          <AlgorithmExplanation activeAlgorithm={selectedAlgorithms.first} />
        </div>

        <div className="race-column">
          <h3>{algorithms.find(a => a.id === selectedAlgorithms.second)?.name}</h3>
          <StockVisualization
            stocks={stocks}
            visualizationType={visualizationType}
            sortKey={sortKey}
            onStockSelect={onStockSelect}
            algorithm={selectedAlgorithms.second}
            speed={speed}
            isRacing={isRacing}
            setMetrics={(newMetrics) => setMetrics(prev => ({
              ...prev,
              second: newMetrics
            }))}
          />
          <PerformanceMetrics
            metrics={metrics.second}
            activeAlgorithm={selectedAlgorithms.second}
            sortKey={sortKey}
            isSorting={isRacing}
          />
          <AlgorithmExplanation activeAlgorithm={selectedAlgorithms.second} />
        </div>
      </div>
    </div>
  );
};

export default AlgorithmRace; 