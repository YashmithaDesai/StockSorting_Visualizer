import React from 'react';

const ScatterPlot = ({ data, sortKey }) => {
    const maxValue = Math.max(...data.map(item => item[sortKey]));
    const chartSize = 500;
    const pointRadius = 12;

    return (
        <svg className="scatter-plot" width={chartSize} height={chartSize}>
            {/* X and Y axes */}
            <line x1="0" y1={chartSize} x2={chartSize} y2={chartSize} stroke="#333" strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2={chartSize} stroke="#333" strokeWidth="2" />
            
            {/* Grid lines and labels */}
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((ratio, i) => (
                <React.Fragment key={i}>
                    <line 
                        x1={0} 
                        y1={chartSize * (1 - ratio)} 
                        x2={chartSize} 
                        y2={chartSize * (1 - ratio)} 
                        stroke="#ddd" 
                        strokeWidth="1" 
                    />
                    <text x={-30} y={chartSize * (1 - ratio) + 5} fontSize="10">
                        ${(maxValue * ratio).toFixed(0)}
                    </text>
                </React.Fragment>
            ))}
            
            {/* Data points */}
            {data.map((stock, i) => {
                const x = (i / data.length) * chartSize * 0.9 + chartSize * 0.05;
                const y = chartSize - (stock[sortKey] / maxValue) * chartSize * 0.9;
                const isPositive = stock.change >= 0;
                
                return (
                    <g key={stock.symbol}>
                        <circle
                            cx={x}
                            cy={y}
                            r={pointRadius}
                            fill={isPositive ? '#4CAF50' : '#F44336'}
                        />
                        <text
                            x={x}
                            y={y - pointRadius - 5}
                            textAnchor="middle"
                            fontSize="12"
                        >
                            {stock.symbol}
                        </text>
                        <text
                            x={x}
                            y={y + pointRadius + 15}
                            textAnchor="middle"
                            fontSize="10"
                        >
                            Vol: {(stock.volume / 1000000).toFixed(1)}M
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

export default ScatterPlot;