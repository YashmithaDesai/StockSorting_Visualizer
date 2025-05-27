import React from 'react';
import { algorithmDescriptions } from '../../algorithms/algorithmHelper';

const AlgorithmSelector = ({ activeAlgorithm, setActiveAlgorithm, disabled }) => {
    const handleAlgorithmChange = (e) => {
        setActiveAlgorithm(e.target.value);
    };

    return (
        <div className="algorithm-selector">
            <label htmlFor="algorithm">Sorting Algorithm:</label>
            <select
                id="algorithm"
                value={activeAlgorithm}
                onChange={handleAlgorithmChange}
                disabled={disabled}
            >
                {Object.keys(algorithmDescriptions).map(key => (
                    <option key={key} value={key}>
                        {algorithmDescriptions[key].name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AlgorithmSelector;