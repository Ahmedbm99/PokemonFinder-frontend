import React  from 'react';
import PropTypes from 'prop-types';
import ReactSlider from 'react-slider';


const StatSlider = ({ label, value, min, max, onChange }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-black">{label}</label>
      <ReactSlider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
        thumbClassName="bg-red-400 w-6 h-6 rounded-full"
        trackClassName="bg-gray-300 h-2 rounded-lg"
      />
      <div className="flex justify-between text-xs">
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );

  StatSlider.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  export default StatSlider;