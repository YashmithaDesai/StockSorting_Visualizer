import React, { useState, useEffect } from 'react';
import './GuessAlgorithm.css';
import StockVisualization from '../Visualizations/StockVisualization';
import PerformanceMetrics from '../Metrics/PerformanceMetrics';

const GuessAlgorithm = ({
  stocks,
  onStockSelect,
  sortKey,
  visualizationType,
  speed,
  setStocks,
  setIsSorting
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [metrics, setMetrics] = useState({
    comparisons: 0,
    swaps: 0,
    startTime: null,
    timeTaken: 0
  });
  const [isSorting, setLocalIsSorting] = useState(false);

  const algorithms = [
    { id: 'bubble', name: 'Bubble Sort' },
    { id: 'quick', name: 'Quick Sort' },
    { id: 'merge', name: 'Merge Sort' },
    { id: 'heap', name: 'Heap Sort' }
  ];

  useEffect(() => {
    if (!selectedAlgorithm) {
      // Randomly select an algorithm when component mounts
      const randomIndex = Math.floor(Math.random() * algorithms.length);
      setSelectedAlgorithm(algorithms[randomIndex].id);
    }
  }, []);

  const startNewGame = () => {
    // Reset game state
    setShowResult(false);
    setUserGuess('');
    setIsCorrect(false);
    setMetrics({
      comparisons: 0,
      swaps: 0,
      startTime: null,
      timeTaken: 0
    });
    // Select new random algorithm
    const randomIndex = Math.floor(Math.random() * algorithms.length);
    setSelectedAlgorithm(algorithms[randomIndex].id);
    // Shuffle stocks
    setStocks([...stocks].sort(() => Math.random() - 0.5));
  };

  const startSort = () => {
    setLocalIsSorting(true);
    setIsSorting(true);
  };

  const handleGuessSubmit = () => {
    const isGuessCorrect = userGuess.toLowerCase() === selectedAlgorithm;
    setIsCorrect(isGuessCorrect);
    setShowResult(true);
  };

  return (
    <div className="guess-algorithm">
      <div className="guess-controls">
        <button 
          onClick={startSort} 
          disabled={isSorting || showResult}
          className="start-button"
        >
          Start Sorting
        </button>

        <div className="guess-input">
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Enter algorithm name..."
            disabled={!isSorting || showResult}
          />
          <button 
            onClick={handleGuessSubmit}
            disabled={!isSorting || showResult || !userGuess}
            className="submit-button"
          >
            Submit Guess
          </button>
        </div>

        {showResult && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            <h3>{isCorrect ? 'WIN! 🎉' : 'LOSE 😢'}</h3>
            <p>The algorithm was: {algorithms.find(a => a.id === selectedAlgorithm)?.name}</p>
            <button onClick={startNewGame} className="new-game-button">
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="visualization-container">
        <StockVisualization
          stocks={stocks}
          visualizationType={visualizationType}
          sortKey={sortKey}
          onStockSelect={onStockSelect}
          algorithm={selectedAlgorithm}
          speed={speed}
          isRacing={isSorting}
          mode="guess"
          setMetrics={setMetrics}
        />
        
        <PerformanceMetrics
          metrics={metrics}
          activeAlgorithm={showResult ? selectedAlgorithm : null}
          sortKey={sortKey}
          isSorting={isSorting}
          hideAlgorithmName={!showResult}
        />
      </div>
    </div>
  );
};

export default GuessAlgorithm; 