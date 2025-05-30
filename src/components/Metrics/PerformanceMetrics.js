import React from 'react';
import { algorithmDescriptions } from '../../algorithms/algorithmHelper';

const PerformanceMetrics = ({ metrics = {}, activeAlgorithm, sortKey, isSorting, hideAlgorithmName = false }) => {
  const algorithmInfo = algorithmDescriptions[activeAlgorithm] || {};
  
  // Calculate operations per second if time taken is more than 0
  const opsPerSecond = (metrics.timeTaken || 0) > 0 
    ? Math.round(((metrics.comparisons || 0) + (metrics.swaps || 0)) / (metrics.timeTaken / 1000))
    : 0;

  // Format time for display
  const formatTime = (ms) => {
    if (!ms) return '0ms';
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  // Format large numbers with commas
  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="performance-metrics">
      <h3>Sorting Performance {metrics.isComplete && '(Complete)'}</h3>
      
      <div className="metrics-grid">
        {/* Algorithm Information */}
        {!hideAlgorithmName && (
          <div className="metric-card">
            <h4>Algorithm</h4>
            <p>{algorithmInfo.name || 'N/A'}</p>
            <div className="metric-description">
              {algorithmInfo.description || 'No description available'}
            </div>
          </div>
        )}

        {/* Complexity Information */}
        <div className="metric-card">
          <h4>Time Complexity</h4>
          <p className="complexity-badge">{hideAlgorithmName ? '???' : algorithmInfo.complexity || 'N/A'}</p>
          {!hideAlgorithmName && (
            <div className="complexity-details">
              <span>Best: {algorithmInfo.bestCase || 'N/A'}</span>
              <span>Average: {algorithmInfo.complexity || 'N/A'}</span>
              <span>Worst: {algorithmInfo.worstCase || algorithmInfo.complexity || 'N/A'}</span>
            </div>
          )}
        </div>

        {/* Current Sort Metrics */}
        <div className="metric-card">
          <h4>Sorting By</h4>
          <p className="sort-key">
            {sortKey === 'price' && 'Stock Price'}
            {sortKey === 'change' && 'Daily Change'}
            {sortKey === 'volume' && 'Trading Volume'}
            {sortKey === 'changePercent' && 'Change %'}
          </p>
          <div className="metric-subtext">
            {isSorting ? 'Sorting in progress...' : metrics.isComplete ? 'Sort complete' : 'Ready to sort'}
          </div>
        </div>

        {/* Time Metrics */}
        <div className="metric-card">
          <h4>Time Taken</h4>
          <p>{formatTime(metrics.timeTaken)}</p>
          <div className="metric-subtext">
            {opsPerSecond > 0 && `${formatNumber(opsPerSecond)} operations/sec`}
          </div>
        </div>

        {/* Comparison Metrics */}
        <div className="metric-card">
          <h4>Comparisons</h4>
          <p>{formatNumber(metrics.comparisons)}</p>
          <div className="metric-subtext">
            {metrics.isComplete ? 
              'Final comparison count' :
              (metrics.comparisons || 0) > 0 && metrics.timeTaken > 0 && 
              `${Math.round((metrics.comparisons || 0) / (metrics.timeTaken / 1000))} cmp/sec`
            }
          </div>
        </div>

        {/* Swap Metrics */}
        <div className="metric-card">
          <h4>Swaps</h4>
          <p>{formatNumber(metrics.swaps)}</p>
          <div className="metric-subtext">
            {metrics.isComplete ? 
              'Final swap count' :
              (metrics.swaps || 0) > 0 && metrics.timeTaken > 0 && 
              `${Math.round((metrics.swaps || 0) / (metrics.timeTaken / 1000))} swaps/sec`
            }
          </div>
        </div>

        {/* Total Operations */}
        {metrics.isComplete && (
          <div className="metric-card total-operations">
            <h4>Total Operations</h4>
            <p>{formatNumber((metrics.comparisons || 0) + (metrics.swaps || 0))}</p>
            <div className="metric-subtext">
              Combined comparisons and swaps
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMetrics;