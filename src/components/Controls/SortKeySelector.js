import React from 'react';

const sortOptions = [
    { value: 'price', label: 'Price' },
    { value: 'change', label: 'Daily Change' },
    { value: 'volume', label: 'Volume' },
    { value: 'changePercent', label: 'Change %' }
];

const SortKeySelector = ({ sortKey, setSortKey, disabled }) => {
    const handleKeyChange = (e) => {
        setSortKey(e.target.value);
    };

    return (
        <div className="sort-key-selector">
            <label htmlFor="sort-key">Sort By:</label>
            <select
                id="sort-key"
                value={sortKey}
                onChange={handleKeyChange}
                disabled={disabled}
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SortKeySelector;