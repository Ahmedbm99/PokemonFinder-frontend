import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import ReactSlider from 'react-slider';

const Search = ({ onSearch, onFilter, onStatSearch, onDefenseSearch, filteredPokemons, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypeInternal, setSelectedTypeInternal] = useState('');
  const [statValue, setStatValue] = useState(0);
  const [defenseValue, setDefenseValue] = useState(0);
  const [sortBy, setSortBy] = useState(''); 
  const [sortOrder, setSortOrder] = useState(''); 

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const getMinMaxValues = (pokemons, statType) => {
    if (!pokemons || pokemons.length === 0) return { min: 40, max: 200 }; 

    const values = pokemons.map(pokemon => pokemon.stats[statType]);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  };

  const { min: minStat, max: maxStat } = getMinMaxValues(filteredPokemons, 'attack');
  const { min: minDefense, max: maxDefense } = getMinMaxValues(filteredPokemons, 'defense');

  const resetFilter = () => {
    setSelectedTypeInternal('');
    setSearchTerm('');
    setStatValue(minStat);
    setDefenseValue(minDefense);
    onFilter('');
    handleSearch({ target: { value: '' } });
    handleStatSearch(minStat);
    handleDefenseSearch(minDefense); 
    if (sortBy !== '' && sortOrder !== '') {
      handleSortChange({ value: '' }); 
      handleSortOrderChange({ value: '' });
    }
  };

  useEffect(() => {
    setStatValue(minStat);
    setDefenseValue(minDefense);
  }, [filteredPokemons, minStat, minDefense]);

  const handleFilter = (event) => {
    setSelectedTypeInternal(event.value);
    onFilter(event.value);
  };

  const handleStatSearch = (value) => {
    setStatValue(value);
    onStatSearch(value);
  };

  const handleDefenseSearch = (value) => {
    setDefenseValue(value);
    onDefenseSearch(value);
  };

  const handleSortChange = (event) => {
    const selectedSortBy = event.value;
    setSortBy(selectedSortBy);
    onSort(selectedSortBy, sortOrder); 
  };

  const handleSortOrderChange = (event) => {
    const selectedSortOrder = event.value;
    setSortOrder(selectedSortOrder);
    onSort(sortBy, selectedSortOrder); 
  };

  return (
    <div className="container mx-auto  text-center mt-1  rounded-lg p-16" style={{backgroundColor: '#4ba3c3'}}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="searchTerm" className="block text-sm font-medium text-black">Search by Name</label>
        <InputText
          id="searchTerm"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Pokémon by name"
          className="p-3 w-full border-2 border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="typeSelect" className="block text-sm font-medium text-black">Select Type</label>
        <Dropdown
          id="typeSelect"
          value={selectedTypeInternal}
          onChange={handleFilter}
          options={[
           
            { label: 'Fire', value: 'fire' },
            { label: 'Water', value: 'water' },
            { label: 'Grass', value: 'grass' },
            { label: 'Electric', value: 'electric' },
            { label: 'Psychic', value: 'psychic' },
            { label: 'Bug', value: 'bug' },
            { label: 'Fairy', value: 'fairy' },
          ]}
          placeholder="Select Type"
          className="p-3 w-full border-2 border-gray-300 rounded-md text-black bg-white"
          panelClassName="bg-white flex flex-col items-center opacity-90  text-black" 
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6  text-black">
     
      <div className="space-y-2">
        <label htmlFor="statValue" className="block text-sm font-medium text-black">Search by Attack Stat</label>
        <ReactSlider
          id="statValue"
          min={minStat}
          max={maxStat}
          value={statValue}
          onChange={handleStatSearch}
          className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer  text-black"
          thumbClassName="bg-red-400 w-6 h-6 rounded-full"
          trackClassName="bg-gray-300 h-2 rounded-lg"
          renderThumb={(props, state) => <div {...props} className="bg-red-400 w-6 h-6 rounded-full  text-black" />}
        />
        <div className="flex justify-between text-xs">
          <span>{minStat}</span>
          <span>{statValue}</span>
          <span>{maxStat}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="defenseValue" className="block text-sm font-medium text-black">Search by Defense Stat</label>
        <ReactSlider
          id="defenseValue"
          min={minDefense}
          max={maxDefense}
          value={defenseValue}
          onChange={handleDefenseSearch}
          className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
          thumbClassName="bg-red-400 w-6 h-6 rounded-full"
          trackClassName="bg-gray-300 h-2 rounded-lg"
          renderThumb={(props, state) => <div {...props} className="bg-red-400 w-6 h-6 rounded-full" />}
        />
        <div className="flex justify-between text-xs">
          <span>{minDefense}</span>
          <span>{defenseValue}</span>
          <span>{maxDefense}</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6  text-black ">

      <div className="space-y-2">
        <label htmlFor="sortBy" className="block text-sm font-medium text-black">Sort By</label>
        <Dropdown
          id="sortBy"
          value={sortBy}
          onChange={handleSortChange}
          options={[
            { label: 'Select Sort Criteria', value: '' },
            { label: 'Name', value: 'name' },
            { label: 'Attack', value: 'attack' },
            { label: 'Defense', value: 'defense' },
          ]}
          placeholder="Select Sort Criteria"
          className="p-3 w-full border-2 border-gray-300 rounded-md text-black bg-white"
          panelClassName="bg-white flex flex-col items-center  text-black opacity-90"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="sortOrder" className="block text-sm font-medium text-black">Sort Order</label>
        <Dropdown
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortOrderChange}
          options={[
            { label: 'Select Sort Order', value: '' },
            { label: 'Ascending', value: 'asc' },
            { label: 'Descending', value: 'desc' },
          ]}
          placeholder="Select Sort Order"
          className="p-3 w-full border-2 border-gray-300 rounded-md text-black bg-white"
          panelClassName="bg-white flex flex-col   text-black items-center opacity-90"
        />
      </div>
    </div>

    <div className="mt-4">
      <button
        onClick={resetFilter}
        className="bg-gray-500 hover:bg-gray-900 text-white p-2 rounded-md"
      >
        Reset Filters
      </button>
    </div>
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onStatSearch: PropTypes.func.isRequired,
  onDefenseSearch: PropTypes.func.isRequired,
  filteredPokemons: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Search;
