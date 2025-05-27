import React from 'react';

const LineChart = ({ data, sortKey }) => {
    const maxValue = Math.max(...data.map(item => item[sortKey]));
    const chartHeight = 300;
    const pointRadius = 8;

    return (
        <svg className="line-chart" width="100%" height={chartHeight}>
            <polyline
                fill="none"
                stroke="#2196F3"
                strokeWidth="3"
                points={data.map((stock, i) => {
                    const x = (i / (data.length - 1)) * 100;
                    const y = chartHeight - (stock[sortKey] / maxValue) * chartHeight;
                    return `${x}%,${y}`;
                }).join(' ')}
            />
            
            {data.map((stock, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = chartHeight - (stock[sortKey] / maxValue) * chartHeight;
                const isPositive = stock.change >= 0;
                
                return (
                    <g key={stock.symbol}>
                        <circle
                            cx={`${x}%`}
                            cy={y}
                            r={pointRadius}
                            fill={isPositive ? '#4CAF50' : '#F44336'}
                        />
                        <text
                            x={`${x}%`}
                            y={y - pointRadius - 5}
                            textAnchor="middle"
                            fontSize="12"
                        >
                            {stock.symbol}
                        </text>
                        <text
                            x={`${x}%`}
                            y={y + pointRadius + 15}
                            textAnchor="middle"
                            fontSize="10"
                        >
                            ${stock[sortKey].toFixed(2)}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

export default LineChart;