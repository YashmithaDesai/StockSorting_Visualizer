import React, { useState, useEffect } from 'react';

const StockInfoPanel = ({ selectedStock }) => {
  const [stockDetails, setStockDetails] = useState(null);

  // Format market capitalization
  const formatMarketCap = (value) => {
    if (typeof value !== 'number') return value;
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  if (!selectedStock) {
    return (
      <div className="stock-info-panel">
        <h3>Stock Information</h3>
        <div className="no-selection">
          <p>Click on a stock in the visualization to see details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stock-info-panel">
      <h3>Stock Information</h3>
      
      <div className="stock-header">
        <h4>{selectedStock.symbol}</h4>
        <span className={`price ${selectedStock.change >= 0 ? 'positive' : 'negative'}`}>
          ${selectedStock.price.toFixed(2)}
        </span>
      </div>

      <div className="stock-details-grid">
        <div className="detail-item">
          <span className="detail-label">Change:</span>
          <span className={`detail-value ${selectedStock.change >= 0 ? 'positive' : 'negative'}`}>
            {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent})
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Volume:</span>
          <span className="detail-value">
            {(selectedStock.volume / 1000000).toFixed(2)}M
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Last Updated:</span>
          <span className="detail-value">
            {new Date(selectedStock.lastUpdated).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockInfoPanel;