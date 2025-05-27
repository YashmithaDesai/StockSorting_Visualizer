// src/components/Visualizations/StockVisualization.js
import React from 'react';

const StockVisualization = ({ stocks, sortKey, onStockSelect }) => {
  const maxValue = Math.max(...stocks.map(stock => stock[sortKey]));

  return (
    <div className="stock-visualization">
      {stocks.map((stock) => (
        <div 
          key={stock.symbol}
          className="stock-item"
          onClick={() => onStockSelect(stock)}
          style={{
            height: `${(stock[sortKey] / maxValue) * 100}%`,
            backgroundColor: stock.change >= 0 ? '#4CAF50' : '#F44336'
          }}
        >
          <span className="stock-label">
            {stock.symbol}: ${stock.price.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StockVisualization;