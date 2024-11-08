import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'primereact/dropdown';

const DropdownField = ({ label, value, options, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-black">{label}</label>
    <Dropdown
      value={value}
      options={options}
      onChange={(e) => onChange(e.value)}
      placeholder={label}
      className="p-3 w-full border-2 border-gray-300 rounded-md text-black bg-white"
      panelClassName="bg-white flex flex-col items-center opacity-90 text-black"
    />
  </div>
);

DropdownField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropdownField;
