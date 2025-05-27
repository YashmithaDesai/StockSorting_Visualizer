import React from 'react';
import { algorithmDescriptions } from '../../algorithms/algorithmHelper';

const PerformanceMetrics = ({ metrics, activeAlgorithm, sortKey, isSorting }) => {
  const algorithmInfo = algorithmDescriptions[activeAlgorithm] || {};
  
  // Calculate operations per second if time taken is more than 0
  const opsPerSecond = metrics.timeTaken > 0 
    ? Math.round((metrics.comparisons + metrics.swaps) / (metrics.timeTaken / 1000))
    : 0;

  // Format time for display
  const formatTime = (ms) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="performance-metrics">
      <h3>Sorting Performance</h3>
      
      <div className="metrics-grid">
        {/* Algorithm Information */}
        <div className="metric-card">
          <h4>Algorithm</h4>
          <p>{algorithmInfo.name}</p>
          <div className="metric-description">
            {algorithmInfo.description}
          </div>
        </div>

        {/* Complexity Information */}
        <div className="metric-card">
          <h4>Time Complexity</h4>
          <p className="complexity-badge">{algorithmInfo.complexity}</p>
          <div className="complexity-details">
            <span>Best: {algorithmInfo.bestCase || 'N/A'}</span>
            <span>Average: {algorithmInfo.complexity}</span>
            <span>Worst: {algorithmInfo.worstCase || algorithmInfo.complexity}</span>
          </div>
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
            {isSorting ? 'Sorting in progress...' : 'Ready to sort'}
          </div>
        </div>

        {/* Time Metrics */}
        <div className="metric-card">
          <h4>Time Taken</h4>
          <p>{formatTime(metrics.timeTaken)}</p>
          <div className="metric-subtext">
            {opsPerSecond > 0 && `${formatNumber(opsPerSecond)} ops/sec`}
          </div>
        </div>

        {/* Comparison Metrics */}
        <div className="metric-card">
          <h4>Comparisons</h4>
          <p>{formatNumber(metrics.comparisons)}</p>
          <div className="metric-subtext">
            {metrics.comparisons > 0 && (
              `${Math.round(metrics.comparisons / (metrics.timeTaken / 1000))} cmp/sec`
            )}
          </div>
        </div>

        {/* Swap Metrics */}
        <div className="metric-card">
          <h4>Swaps</h4>
          <p>{formatNumber(metrics.swaps)}</p>
          <div className="metric-subtext">
            {metrics.swaps > 0 && (
              `${Math.round(metrics.swaps / (metrics.timeTaken / 1000))} swaps/sec`
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;