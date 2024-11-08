import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const PokemonCard = ({ pokemon}) => {
  const {id, name, sprites, stats, types, abilities } = pokemon;
  const location = useLocation();
  console.log(id);
  const isDetailsPage = location.pathname.includes(`/pokemon-details/${id}`);

  return (
    <div className="p-6 border mt-6 rounded-2xl shadow-2xl bg-gradient-to-r from-cyan-700 via-blue-200 to-blue-900 min-w-[320px] min-h-[400px] mx-auto cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <Link to={`/pokemon-details/${id}`}>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-1 text-center">#{id}</h2>

        <div className="flex justify-center mb-4">
          {types?.map((type) => (
            <span key={type} className="mr-2 py-1 px-3 text-lg text-white bg-red-700 rounded-full">
              {type}
            </span>
          ))}
        </div>

        <h2 className="text-3xl text-center mb-4 text-rose-700 font-bold">{name}</h2>

        <img
          src={sprites?.front_default}
          alt={name}
          className="w-40 h-40 mx-auto mb-4 rounded-full border-4 border-white shadow-lg"
        />

        <p className="text-xl text-center text-pink-800"><strong>HP:</strong> {stats?.[0]?.base_stat}</p>

        {!isDetailsPage ? null : (
          <div className="text-white text-center">
            <p className="text-xl mb-2 text-pink-800"><strong>Attack:</strong> {stats?.[1]?.base_stat}</p>
            <p className="text-xl mb-2 text-pink-800"><strong>Defense:</strong> {stats?.[2]?.base_stat}</p>

            <strong className="text-lg text-pink-800">Abilities:</strong>
            <ul className="mt-2">
              {abilities?.length ? (
                abilities.map((ability) => (
                  <li key={ability.name} className="text-lg py-1 px-3 bg-orange-200 text-pink-800 mr-2 mb-2 rounded-full">
                    {ability.name}
                  </li>
                ))
              ) : (
                <p className="text-pink-800">No abilities available</p>
              )}
            </ul>
          </div>
        )}
      </Link>
    </div>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sprites: PropTypes.object.isRequired,
    stats: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired,
    abilities: PropTypes.array.isRequired,
  }).isRequired,
};

export default PokemonCard;
