import React from 'react';

const BarChart = ({ data, sortKey, onStockClick }) => {
  // Get the display value based on sortKey
  const getDisplayValue = (stock) => {
    switch(sortKey) {
      case 'price':
        return `$${stock.price.toFixed(2)}`;
      case 'volume':
        return `${(stock.volume / 1000000).toFixed(1)}M`;
      case 'change':
        return `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}`;
      case 'changePercent':
        return stock.changePercent;
      default:
        return `$${stock.price.toFixed(2)}`;
    }
  };

  const maxValue = Math.max(...data.map(item => item[sortKey]));
  
  return (
    <div className="bar-chart">
      {data.map((stock) => {
        const percentage = (stock[sortKey] / maxValue) * 100;
        const isPositive = stock.change >= 0;
        
        return (
          <div 
            key={stock.symbol}
            className="stock-bar"
            onClick={() => onStockClick && onStockClick(stock)}
            style={{
              width: `${percentage}%`,
              backgroundColor: isPositive ? '#4CAF50' : '#F44336'
            }}
          >
            <span className="stock-label">
              {stock.symbol}: {getDisplayValue(stock)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;