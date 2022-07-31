import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedCocktails {
        strDrink
        strInstructions
        idDrink
        strDrinkThumb
      }
    }
  }
`;