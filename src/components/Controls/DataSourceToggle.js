import React from 'react';
import PropTypes from 'prop-types';

const DataSourceToggle = ({ 
  useLiveData, 
  setUseLiveData, 
  isSorting,
  onDataChange 
}) => {
  const handleToggle = async (newValue) => {
    if (isSorting) return;
    
    try {
      setUseLiveData(newValue);
      if (onDataChange) {
        await onDataChange(newValue);
      }
    } catch (error) {
      console.error("Error changing data source:", error);
      // Revert if error occurs
      setUseLiveData(!newValue);
    }
  };

  return (
    <div className="data-source-toggle">
      <label>Data Source:</label>
      <div className="toggle-container">
        <button
          className={`toggle-option ${!useLiveData ? 'active' : ''}`}
          onClick={() => handleToggle(false)}
          disabled={isSorting || !useLiveData}
          aria-pressed={!useLiveData}
        >
          Mock Data
        </button>
        <button
          className={`toggle-option ${useLiveData ? 'active' : ''}`}
          onClick={() => handleToggle(true)}
          disabled={isSorting || useLiveData}
          aria-pressed={useLiveData}
        >
          Live API
        </button>
      </div>
      <div className="data-source-status">
        {useLiveData ? (
          <span className="live-status">✓ Connected to live data</span>
        ) : (
          <span className="mock-status">Using mock data</span>
        )}
      </div>
    </div>
  );
};

DataSourceToggle.propTypes = {
  useLiveData: PropTypes.bool.isRequired,
  setUseLiveData: PropTypes.func.isRequired,
  isSorting: PropTypes.bool,
  onDataChange: PropTypes.func
};

DataSourceToggle.defaultProps = {
  isSorting: false,
  onDataChange: null
};

export default DataSourceToggle;