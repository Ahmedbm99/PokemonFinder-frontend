import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_POKEMONS } from '../../graphql/queries/PokemonQueries';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import Search from '../../components/Search/Search';
import PokemonCard from '../../components/Pokemon/PokemonCard';
import { ProgressSpinner } from 'primereact/progressspinner';

const Home = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statValue, setStatValue] = useState('');
  const [defenseValue, setDefenseValue] = useState('');
  const [sortCriteria, setSortCriteria] = useState({ criteria: 'name', order: 'asc' });
  const itemsPerPage = 12;
  const navigate = useNavigate();

  const filteredAndSortedPokemons = useMemo(() => {
    if (!data) return [];
   
    let filteredPokemons = data.pokemons
      .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(pokemon => {
        if (filterType) return pokemon.types.includes(filterType);
        return true;
      })
      .filter(pokemon => {
        if (statValue) {
          const attackStat = pokemon.stats.find(stat => stat.name === 'attack');
          return attackStat && attackStat.base_stat >= statValue;
        }
        return true;
      })
      .filter(pokemon => {
        if (defenseValue) {
          const defenseStat = pokemon.stats.find(stat => stat.name === 'defense');
          return defenseStat && defenseStat.base_stat >= defenseValue;
        }
        return true;
      });

    // Sort based on criteria
    filteredPokemons.sort((a, b) => {
      if (sortCriteria.criteria === 'name') {
        return sortCriteria.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else {
        const statA = a.stats.find(stat => stat.name === sortCriteria.criteria)?.base_stat || 0;
        const statB = b.stats.find(stat => stat.name === sortCriteria.criteria)?.base_stat || 0;
        return sortCriteria.order === 'asc' ? statA - statB : statB - statA;
      }
    });

    return filteredPokemons;
  }, [data, searchTerm, filterType, statValue, defenseValue, sortCriteria]);

  const totalPages = Math.ceil(filteredAndSortedPokemons.length / itemsPerPage);
  const paginatedPokemons = filteredAndSortedPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleStatSearch = (value) => setStatValue(value);
  const handleDefenseSearch = (value) => setDefenseValue(value);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <ProgressSpinner aria-label="Loading" />
    </div>
  );
  if (error) {
    navigate("/Error"); return null ;
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedPokemons.map((pokemon, index) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            index={index + 1 + (currentPage - 1) * itemsPerPage}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <ul className="flex gap-2">
            <li>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-md bg-gray-300 hover:bg-gray-400 ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Previous page"
              >
                Prev
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <li key={pageNum}>
                  <button
                    onClick={() => paginate(pageNum)}
                    className={`p-2 rounded-md ${
                      currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                </li>
              );
            })}

            <li>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md bg-gray-300 hover:bg-gray-400 ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Next page"
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
