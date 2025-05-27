import React from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ScatterPlot from './ScatterPlot';

const Visualization = ({ stocks, visualizationType, sortKey, onStockSelect }) => {
  const handleStockClick = (stock) => {
    if (onStockSelect) {
      onStockSelect(stock);
    }
  };

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