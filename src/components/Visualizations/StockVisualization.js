// src/components/Visualizations/StockVisualization.js
import React, { useEffect, useState } from 'react';
import { sortingAlgorithms } from '../../algorithms/algorithmHelper';

const StockVisualization = ({ 
  stocks, 
  sortKey, 
  onStockSelect, 
  algorithm,
  speed,
  isRacing,
  setMetrics 
}) => {
  const [localStocks, setLocalStocks] = useState([...stocks]);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [sortStartTime, setSortStartTime] = useState(null);
  const [currentMetrics, setCurrentMetrics] = useState({
    comparisons: 0,
    swaps: 0,
    timeTaken: 0,
    isComplete: false
  });

  useEffect(() => {
    setLocalStocks([...stocks]);
  }, [stocks]);

  useEffect(() => {
    if (isRacing && algorithm) {
      const startSort = async () => {
        const startTime = performance.now();
        setSortStartTime(startTime);
        
        // Reset metrics at start
        const initialMetrics = {
          comparisons: 0,
          swaps: 0,
          startTime,
          timeTaken: 0,
          isComplete: false
        };
        setCurrentMetrics(initialMetrics);
        setMetrics(initialMetrics);

        const updateFn = async (updatedArray, indices, isSwap, delay, finalMetrics) => {
          return new Promise(resolve => {
            setHighlightedIndices(indices);
            setLocalStocks([...updatedArray]);
            
            // If final metrics are provided, use those
            if (finalMetrics) {
              const finalState = {
                comparisons: finalMetrics.totalComparisons,
                swaps: finalMetrics.totalSwaps,
                timeTaken: performance.now() - startTime,
                isComplete: true
              };
              setCurrentMetrics(finalState);
              setMetrics(finalState);
            } else {
              // Update metrics in real-time
              setCurrentMetrics(prev => {
                const newMetrics = {
                  ...prev,
                  comparisons: indices && indices.length >= 2 ? prev.comparisons + 1 : prev.comparisons,
                  swaps: isSwap ? prev.swaps + 1 : prev.swaps,
                  timeTaken: performance.now() - startTime
                };
                // Update parent component's metrics
                setMetrics(newMetrics);
                return newMetrics;
              });
            }

            setTimeout(resolve, delay);
          });
        };

        try {
          const sortFunction = sortingAlgorithms[algorithm];
          if (sortFunction) {
            const arrayCopy = [...localStocks];
            const transformedArray = arrayCopy.map(stock => ({
              ...stock,
              // For price and volume, use absolute values for negative changes
              // For change and changePercent, use actual values to maintain negative ordering
              sortValue: sortKey === 'price' || sortKey === 'volume'
                ? (stock.change < 0 ? -stock[sortKey] : stock[sortKey])
                : stock[sortKey]
            }));
            
            await sortFunction(transformedArray, 'sortValue', speed, updateFn);
            
            // The final metrics will be set by the last updateFn call
            setLocalStocks(transformedArray);
          }
        } catch (error) {
          console.error('Sorting error:', error);
        }
      };

      startSort();
    } else {
      setHighlightedIndices([]);
      setSortStartTime(null);
      setCurrentMetrics({
        comparisons: 0,
        swaps: 0,
        timeTaken: 0,
        isComplete: false
      });
    }
  }, [isRacing, algorithm, speed, sortKey]);

  const maxValue = Math.max(...localStocks.map(stock => Math.abs(stock[sortKey])));

  return (
    <div className="stock-visualization">
      {localStocks.map((stock, index) => {
        const value = stock[sortKey];
        const isNegative = stock.change < 0;
        
        return (
          <div 
            key={stock.symbol}
            className={`stock-item ${highlightedIndices.includes(index) ? 'highlighted' : ''}`}
            onClick={() => onStockSelect(stock)}
            style={{
              height: `${(Math.abs(value) / maxValue) * 100}%`,
              backgroundColor: highlightedIndices.includes(index) 
                ? '#FFD700'
                : isNegative ? '#F44336' : '#4CAF50',
              transition: 'all 0.3s ease'
            }}
          >
            <span className="stock-label">
              {stock.symbol}: ${typeof value === 'number' ? Math.abs(value).toFixed(2) : value}
              {(sortKey === 'change' || sortKey === 'changePercent') && (isNegative ? ' (-) ' : ' (+) ')}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StockVisualization;