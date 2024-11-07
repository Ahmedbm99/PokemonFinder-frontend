import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query GetPokemons {
    pokemons {
      name
      url
      types
      sprites {
        front_default
        back_default  
      }
      stats {
        name
        base_stat
      }
      abilities {
        name
        url
      }
      
    }
  }
`;

export const Get_Pokemons_BY_Name = gql `
query GetPokemonByName($name: String!) {
  pokemon(name: $name) {
    name
      url
      types
      sprites {
        front_default
        back_default  
      }
      stats {
        name
        base_stat
      }
      abilities {
        name
        url
      }
      
    } 
 
}`;

