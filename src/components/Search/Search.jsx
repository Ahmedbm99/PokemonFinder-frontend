import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import StatSlider from './StatSlider';
import DropdownField from './DropdownField';
const Search = ({ onSearch, onFilter, onStatSearch, onDefenseSearch, filteredPokemons, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [statValue, setStatValue] = useState(0);
  const [defenseValue, setDefenseValue] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const getMinMaxValues = (pokemons, statType) => {
    if (!pokemons) return { min: 40, max: 200 };
    const values = pokemons.map(pokemon => pokemon.stats[statType]);
    return { min: Math.min(...values), max: Math.max(...values) };
  };

  const { min: minStat, max: maxStat } = getMinMaxValues(filteredPokemons, 'attack');
  const { min: minDefense, max: maxDefense } = getMinMaxValues(filteredPokemons, 'defense');

  const resetFilters = () => {
    setSelectedType('');
    setSearchTerm('');
    setStatValue(minStat);
    setDefenseValue(minDefense);
    onFilter('');
    handleSearch({ target: { value: '' } });
    handleStatSearch(minStat);
    handleDefenseSearch(minDefense);
    if (sortBy || sortOrder) {
      handleSortChange('');
      handleSortOrderChange('');
    }
  };

  useEffect(() => {
    setStatValue(minStat);
    setDefenseValue(minDefense);
  }, [filteredPokemons, minStat, minDefense]);

  const handleStatSearch = (value) => {
    setStatValue(value);
    onStatSearch(value);
  };

  const handleFilter = (event) => {
    setSelectedType(event.value);
    onFilter(event.value);
  };

  const handleDefenseSearch = (value) => {
    setDefenseValue(value);
    onDefenseSearch(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSort(value, sortOrder);
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
    onSort(sortBy, value);
  };

  const dropdownOptions = {
    type: [
      { label: 'Fire', value: 'fire' },
      { label: 'Water', value: 'water' },
      { label: 'Grass', value: 'grass' },
      { label: 'Electric', value: 'electric' },
      { label: 'Psychic', value: 'psychic' },
      { label: 'Bug', value: 'bug' },
      { label: 'Fairy', value: 'fairy' },
    ],
    sortBy: [  
      { label: 'Name', value: 'name' },
      { label: 'Attack', value: 'attack' },
      { label: 'Defense', value: 'defense' },
    ],
    sortOrder: [    
      { label: 'Ascending', value: 'asc' },
      { label: 'Descending', value: 'desc' },
    ],
  };

  return (
    <div className="container mx-auto text-center mt-1 rounded-lg p-16" style={{ backgroundColor: '#4ba3c3' }}>
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
            value={selectedType}
            onChange={(e) => handleFilter(e)}
            options={dropdownOptions.type}
            placeholder="Select Type"
            className="p-3 w-full border-2 border-gray-300 rounded-md text-black bg-white"
            panelClassName="bg-white flex flex-col items-center opacity-90  text-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-black">
        <StatSlider label="Search by Attack Stat" value={statValue} min={minStat} max={maxStat} onChange={handleStatSearch} />
        <StatSlider label="Search by Defense Stat" value={defenseValue} min={minDefense} max={maxDefense} onChange={handleDefenseSearch} />
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-black" >
        <DropdownField label="Sort By"  value={sortBy} options={dropdownOptions.sortBy} onChange={handleSortChange} />
        <DropdownField label="Sort Order"   value={sortOrder} options={dropdownOptions.sortOrder} onChange={handleSortOrderChange} />
      </div>

      <div className="mt-4">
        <button onClick={resetFilters} className="bg-gray-500 hover:bg-gray-900 text-white p-2 rounded-md">
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
