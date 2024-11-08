import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query GetPokemons {
    pokemons {
    id 
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

export const Get_Pokemons_BY_ID = gql `
query GetPokemonByName($id: ID!) {
  pokemon(id: $id) {
      id    
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

