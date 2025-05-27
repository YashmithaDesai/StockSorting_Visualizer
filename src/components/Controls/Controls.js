import React, { useState } from 'react';
import AlgorithmSelector from './AlgorithmSelector';
import SortKeySelector from './SortKeySelector';
import SpeedControl from './SpeedControl';
import VisualizationSwitcher from '../Visualizations/VisualizationSwitcher';
import { sortingAlgorithms } from '../../algorithms/algorithmHelper';

const Controls = ({
  activeAlgorithm,
  setActiveAlgorithm,
  sortKey,
  setSortKey,
  speed,
  setSpeed,
  visualizationType,
  setVisualizationType,
  isSorting,
  setIsSorting,
  stocks,
  setStocks,
  setMetrics
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);

  const handleSort = async () => {
    if (isSorting) {
      if (isPaused) {
        // Resume sorting
        setIsPaused(false);
        currentStep.resume();
      } else {
        // Pause sorting
        setIsPaused(true);
      }
      return;
    }

    setIsSorting(true);
    setMetrics(prev => ({
      ...prev,
      comparisons: 0,
      swaps: 0,
      startTime: performance.now(),
      timeTaken: 0
    }));

    const algorithm = sortingAlgorithms[activeAlgorithm];
    const arrayCopy = [...stocks];

    // Create an update function that tracks metrics
    const updateFn = async (updatedArray, highlightedIndices, isSwap, delay) => {
      return new Promise(resolve => {
        // Update metrics
        setMetrics(prev => {
          const newMetrics = { ...prev };
          
          if (highlightedIndices && highlightedIndices.length >= 2) {
            newMetrics.comparisons = (prev.comparisons || 0) + 1;
          }
          
          if (isSwap) {
            newMetrics.swaps = (prev.swaps || 0) + 1;
          }
          
          newMetrics.timeTaken = performance.now() - prev.startTime;
          return newMetrics;
        });

        // Update visualization
        setStocks([...updatedArray]);

        // Handle pausing
        if (isPaused) {
          const step = { resolve };
          setCurrentStep(step);
        } else {
          setTimeout(resolve, delay);
        }
      });
    };

    try {
      await algorithm(arrayCopy, sortKey, speed, updateFn);
    } catch (error) {
      console.error("Sorting error:", error);
    } finally {
      setIsSorting(false);
      setIsPaused(false);
      setCurrentStep(null);
    }
  };

  const handleReset = () => {
    setStocks([...stocks].sort(() => Math.random() - 0.5)); // Shuffle
    setMetrics({
      comparisons: 0,
      swaps: 0,
      startTime: null,
      timeTaken: 0
    });
  };

  return (
    <div className="controls">
      <AlgorithmSelector 
        activeAlgorithm={activeAlgorithm}
        setActiveAlgorithm={setActiveAlgorithm}
        disabled={isSorting && !isPaused}
      />
      
      <SortKeySelector 
        sortKey={sortKey}
        setSortKey={setSortKey}
        disabled={isSorting && !isPaused}
      />
      
      <SpeedControl 
        speed={speed}
        setSpeed={setSpeed}
      />
      
      <VisualizationSwitcher 
        visualizationType={visualizationType}
        setVisualizationType={setVisualizationType}
      />
      
      <div className="control-buttons">
        <button 
          onClick={handleSort} 
          className={isSorting ? (isPaused ? 'resume' : 'pause') : 'start'}
        >
          {isSorting ? (isPaused ? 'Resume' : 'Pause') : 'Start Sorting'}
        </button>
        
        <button 
          onClick={handleReset}
          disabled={isSorting && !isPaused}
          className="reset"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Controls;