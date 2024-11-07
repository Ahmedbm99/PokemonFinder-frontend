import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const PokemonCard = ({ pokemon, index }) => {
  const { name, sprites, stats, types, abilities } = pokemon;
  const location = useLocation();

  const isDetailsPage = location.pathname.includes(`/pokemon-details/${name}`);

  return (
    <div className="p-6 border mt-6 rounded-2xl shadow-2xl bg-gradient-to-r from-cyan-700 via-blue-200 to-blue-900 min-w-[320px] min-h-[400px] mx-auto cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <Link to={`/pokemon-details/${pokemon.name}`}>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-1 text-center">
          #{index}
        </h2>
        <div className="flex justify-center mb-4">
          {types?.map((type) => (
            <span key={type} className="mr-2 py-1 px-3 text-lg text-white bg-red-700 rounded-full">
              {type}
            </span>
          ))}
        </div>
        <h2 className="text-3xl text-center mb-4 text-rose-700 font-bold">
          {name}
        </h2>

        <img
          src={sprites?.front_default}
          alt={name}
          className="w-40 h-40 mx-auto mb-4 rounded-full border-4 border-white shadow-lg"
        />
        <p className="text-xl text-center text-pink-800"><strong>HP:</strong> {stats?.[0]?.base_stat}</p>
        {/* Conditionally render stats */}
        <div className="text-white text-center">
          {!isDetailsPage ? (
            <>
              
            </>
          ) : (
            <>
              {stats?.map((stat) => (
                <p key={stat.name} className="text-xl mb-2"> </p>
              ))}
              <div>
                <p className="text-xl mb-2 text-pink-800"><strong>Attack:</strong> {stats?.[1]?.base_stat}</p>
                <p className="text-xl mb-2 text-pink-800"><strong>Defense:</strong> {stats?.[2]?.base_stat}</p>

                <strong className="text-lg text-pink-800">Abilities:</strong>
                <ul className="mt-2">
  {abilities && abilities.length > 0 ? (
    abilities.map((ability) => (
      <li
        key={ability.name}  // Use ability's name or unique id as the key
        className="text-lg py-1 px-3 bg-orange-200 text-pink-800 mr-2 mb-2 rounded-full"
      >
        {ability.name}
      </li>
    ))
  ) : (
    <p className="text-pink-800">No abilities available</p>
  )}
</ul>
              </div>
            </>
          )}
        </div>
      </Link>
    </div>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sprites: PropTypes.object.isRequired,
    stats: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired,
    abilities: PropTypes.array.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default PokemonCard;
