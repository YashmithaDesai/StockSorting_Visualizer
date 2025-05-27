import React from 'react';

const visualizationTypes = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'scatter', label: 'Scatter Plot' }
];

const VisualizationSwitcher = ({ visualizationType, setVisualizationType }) => {
    const handleVisualizationChange = (e) => {
        setVisualizationType(e.target.value);
    };

    return (
        <div className="visualization-switcher">
            <label htmlFor="visualization-type">View:</label>
            <select
                id="visualization-type"
                value={visualizationType}
                onChange={handleVisualizationChange}
            >
                {visualizationTypes.map(type => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default VisualizationSwitcher;