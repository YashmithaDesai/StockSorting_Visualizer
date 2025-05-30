import React from 'react';

const CompanyCountSelector = ({ companyCount, setCompanyCount, disabled }) => {
  const handleChange = (e) => {
    const count = parseInt(e.target.value);
    setCompanyCount(count);
  };

  return (
    <div className="company-count-selector">
      <label htmlFor="company-count">Number of Companies:</label>
      <select
        id="company-count"
        value={companyCount}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="5">5 Companies</option>
        <option value="8">8 Companies</option>
        <option value="10">10 Companies</option>
        <option value="12">12 Companies</option>
        <option value="15">All Companies (15)</option>
      </select>
    </div>
  );
};

export default CompanyCountSelector; 