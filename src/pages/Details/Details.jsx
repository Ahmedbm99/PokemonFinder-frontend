import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams ,  useNavigate } from 'react-router-dom'; // For dynamic routing
import { Get_Pokemons_BY_ID } from '../../graphql/queries/PokemonQueries';
import PokemonStats from '../../components/Pokemon/PokeStat';
import { ProgressSpinner } from 'primereact/progressspinner';
import PokemonCard from '../../components/Pokemon/PokemonCard';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
const Details = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(Get_Pokemons_BY_ID, {
    variables: { id },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner aria-label="Loading" />
      </div>
    );
  }

  if (error) {
    navigate("/Error"); return null ;
  }

  const pokemon = data?.pokemon; 

  if (!pokemon) { 
    navigate("/Error"); return null ;
  }
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
  <PokemonCard pokemon={pokemon} />
  <PokemonStats pokemon={pokemon} />
</div>
      <Footer />
    </div>
  );
};

export default Details;
