import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_POKEMONS } from '../../graphql/queries/PokemonQueries';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import Search from '../../components/Search/Search';
import PokemonCard from '../../components/Pokemon/PokemonCard';
import LoadingSpinner from '../../components/Home/LoadingSpinner';
import Pagination from '../../components/Home/Pagination';
const Home = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statValue, setStatValue] = useState('');
  const [defenseValue, setDefenseValue] = useState('');
  const [sortCriteria, setSortCriteria] = useState({ criteria: 'name', order: 'asc' });

  const itemsPerPage = 12;

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to page 1
  };

  const handleFilter = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const handleSort = (criteria, order) => {
    setSortCriteria({ criteria, order });
  };

  const handleStatSearch = (value) => setStatValue(value);
  const handleDefenseSearch = (value) => setDefenseValue(value);

  const filteredAndSortedPokemons = useMemo(() => {
    if (!data) return [];
    
    const filteredPokemons = data.pokemons
      .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(pokemon => !filterType || pokemon.types.includes(filterType))
      .filter(pokemon => !statValue || pokemon.stats.some(stat => stat.name === 'attack' && stat.base_stat >= statValue))
      .filter(pokemon => !defenseValue || pokemon.stats.some(stat => stat.name === 'defense' && stat.base_stat >= defenseValue));

    return filteredPokemons.sort((a, b) => {
      if (sortCriteria.criteria === 'name') {
        return sortCriteria.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else {
        const statA = a.stats.find(stat => stat.name === sortCriteria.criteria)?.base_stat || 0;
        const statB = b.stats.find(stat => stat.name === sortCriteria.criteria)?.base_stat || 0;
        return sortCriteria.order === 'asc' ? statA - statB : statB - statA;
      }
    });
  }, [data, searchTerm, filterType, statValue, defenseValue, sortCriteria]);

  const totalPages = Math.ceil(filteredAndSortedPokemons.length / itemsPerPage);
  const paginatedPokemons = filteredAndSortedPokemons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  if (loading) return <LoadingSpinner />;
  if (error) {
    navigate("/Error");
    return null;
  }

  return (
    <div>
      <Header />
      <Search 
        onSearch={handleSearch} 
        onStatSearch={handleStatSearch} 
        onDefenseSearch={handleDefenseSearch} 
        onFilter={handleFilter}
        onSort={handleSort} 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {paginatedPokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} id={pokemon.id} />
        ))}
      </div>

      {totalPages > 1 && <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPrevious={goToPreviousPage} 
        onNext={goToNextPage} 
        onPageChange={paginate} 
      />}

      <Footer />
    </div>
  );
};



export default Home;
