import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };

  return (
    <header className="p-8 rounded-lg shadow-xl text-white" style={{ backgroundColor: '#003049' }}>
      
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2">
        <button onClick={goToHome}> Pokémon Finder</button>
        </h1>
        <p className="text-xl mb-6">Search and explore your favorite Pokémon</p>
        <img src="../../assets/img/pokemon.512x185.png" alt='' />
      
      </div>
    </header>
  );
};

export default Header;
