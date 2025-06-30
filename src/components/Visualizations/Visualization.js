import React from 'react';
import StockVisualization from './StockVisualization';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ScatterPlot from './ScatterPlot';

const Visualization = ({ 
  stocks, 
  visualizationType, 
  sortKey, 
  onStockSelect,
  algorithm,
  speed,
  isRacing,
  setMetrics
}) => {
  const handleStockClick = (stock) => {
    if (onStockSelect) {
      onStockSelect(stock);
    }
  };

  // If we have an active algorithm, use StockVisualization
  if (algorithm) {
    return (
      <StockVisualization
        stocks={stocks}
        visualizationType={visualizationType}
        sortKey={sortKey}
        onStockSelect={onStockSelect}
        algorithm={algorithm}
        speed={speed}
        isRacing={isRacing}
        setMetrics={setMetrics}
        mode="single"
      />
    );
  }

  // Otherwise, use the static visualizations
  const renderVisualization = () => {
    const commonProps = {
      data: stocks,
      sortKey: sortKey,
      onStockClick: handleStockClick
    };

    switch (visualizationType) {
      case 'bar':
        return <BarChart {...commonProps} />;
      case 'line':
        return <LineChart {...commonProps} />;
      case 'scatter':
        return <ScatterPlot {...commonProps} />;
      default:
        return <BarChart {...commonProps} />;
    }
  };

  return (
    <div className="visualization-container">
      {renderVisualization()}
    </div>
  );
};

export default Visualization;